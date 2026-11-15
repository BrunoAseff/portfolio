"""Generate the two reviewed one-page resumes and their lazy dialog previews.
Run with Python + reportlab/pypdf/Pillow; rendering requires pdftoppm.
The web build consumes the committed outputs, without a Python dependency.
"""
from pathlib import Path
from xml.sax.saxutils import escape
import json,shutil,subprocess,hashlib
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer
from reportlab.pdfgen.canvas import Canvas
from pypdf import PdfReader
from PIL import Image
ROOT=Path(__file__).resolve().parents[2]
DATA=json.loads((ROOT/'src/content/resume.json').read_text())
OUT=ROOT.parent/'output/pdf';OUT.mkdir(parents=True,exist_ok=True)
TMP=ROOT.parent/'tmp/pdfs';TMP.mkdir(parents=True,exist_ok=True)
PUBLIC=ROOT/'public/documents/resumes';PUBLIC.mkdir(parents=True,exist_ok=True)
PREVIEWS=ROOT/'public/documents/previews';PREVIEWS.mkdir(parents=True,exist_ok=True)
pdfmetrics.registerFont(TTFont('Manrope',Path(__file__).parent/'fonts/Manrope-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Manrope-Semibold',Path(__file__).parent/'fonts/Manrope-Semibold.ttf'))
pdfmetrics.registerFontFamily('Manrope',normal='Manrope',bold='Manrope-Semibold')
ink=HexColor('#20262c');muted=HexColor('#4c5862')
base=dict(fontName='Manrope',fontSize=10.5,leading=14.4,textColor=ink,alignment=TA_LEFT,allowWidows=0,allowOrphans=0)
styles={
 'name':ParagraphStyle('Name',**{**base,'fontName':'Manrope-Semibold','fontSize':22,'leading':27,'spaceAfter':3}),
 'role':ParagraphStyle('Role',**{**base,'fontSize':11,'leading':16,'spaceAfter':4}),
 'meta':ParagraphStyle('Meta',**{**base,'fontSize':9.5,'leading':13,'textColor':muted,'spaceAfter':3}),
 'links':ParagraphStyle('Links',**{**base,'fontSize':9.4,'leading':13,'textColor':muted,'spaceAfter':2}),
 'section':ParagraphStyle('Section',**{**base,'fontName':'Manrope-Semibold','fontSize':11.8,'leading':16,'spaceBefore':14,'spaceAfter':6,'keepWithNext':True}),
 'entry':ParagraphStyle('Entry',**{**base,'fontName':'Manrope-Semibold','fontSize':10.7,'leading':15,'keepWithNext':True}),
 'period':ParagraphStyle('Period',**{**base,'fontSize':9.5,'leading':13,'textColor':muted,'spaceAfter':4,'keepWithNext':True}),
 'body':ParagraphStyle('Body',**{**base,'spaceAfter':3}),
 'bullet':ParagraphStyle('Bullet',**{**base,'leftIndent':10,'firstLineIndent':-10,'spaceAfter':3}),
 'project':ParagraphStyle('Project',**{**base,'spaceAfter':3,'keepWithNext':True}),
}
def resume_canvas(*args,**kwargs):
 kwargs['initialFontName']='Manrope'
 kwargs['initialFontSize']=10.5
 return Canvas(*args,**kwargs)
def P(text,style='body'):return Paragraph(text,styles[style])
def E(text):return escape(str(text))
def link(url,text):return '<a href="'+E(url)+'" color="#334f63"><u>'+E(text)+'</u></a>'
manifest_path=ROOT/'src/features/documents/previews.json'
manifest=json.loads(manifest_path.read_text())
proof={}
for lang in ['pt','en']:
 c=DATA[lang];flow=[P(E(DATA['name']),'name'),P(E(c['role']),'role'),P(E(c['meta']),'meta')]
 flow += [P(link('mailto:'+DATA['email'],DATA['email'])+' · '+link(DATA['portfolio'],'brunoaseff.com.br'),'links'),P(link(DATA['linkedin'],'linkedin.com/in/bruno-aseff')+' · '+link(DATA['github'],'github.com/BrunoAseff'),'links')]
 flow.append(P(E(c['headings'][0]),'section'))
 for i,entry in enumerate(c['experience']):
  if i:flow.append(Spacer(1,6))
  flow.extend([P(E(entry['name']),'entry'),P(E(entry['period']),'period')])
  for bullet in entry['bullets']:flow.append(P('• '+E(bullet),'bullet'))
 flow.append(P(E(c['headings'][1]),'section'))
 flow.extend(P(E(text)) for text in c['skills'])
 flow.append(P(E(c['headings'][2]),'section'))
 for i,project in enumerate(c['projects']):
  if i:flow.append(Spacer(1,5))
  flow.extend([P('<b>'+E(project['name'])+'</b> — '+link(project['url'],project['label']),'project'),P(E(project['text']))])
 flow.append(P(E(c['headings'][3]),'section'))
 flow.extend([P('<b>'+E(c['education'][0])+'</b>'),P(E(c['education'][1]))])
 flow.append(P(E(c['headings'][4]),'section'));flow.append(P(E(c['certification'])))
 filename='bruno-aseff-'+lang+'.pdf';pdf=OUT/filename
 doc=SimpleDocTemplate(str(pdf),pagesize=A4,leftMargin=48,rightMargin=48,topMargin=40,bottomMargin=40,title=DATA['name']+' — '+c['role'],author=DATA['name'],subject=c['role'],pageCompression=1)
 doc.build(flow,canvasmaker=resume_canvas)
 reader=PdfReader(pdf);assert len(reader.pages)==1,(lang,'Resume must fit one readable page')
 text=reader.pages[0].extract_text();assert DATA['email'] in text and 'TypeScript' in text and ('24 anos' if lang=='pt' else '24 years old') in text
 assert ('Inglês fluente' if lang=='pt' else 'Fluent English') in text
 assert all(name in text for name in ['Bússola Social','Access Global Logistics','Lazúli','Eye Patch'])
 annotations=reader.pages[0].get('/Annots',[]);assert len(annotations)>=6
 (OUT/('bruno-aseff-'+lang+'.txt')).write_text(text)
 shutil.copyfile(pdf,PUBLIC/filename)
 stem=TMP/('resume-'+lang)
 subprocess.run(['pdftoppm','-f','1','-singlefile','-scale-to','1800','-png',str(pdf),str(stem)],check=True)
 with Image.open(str(stem)+'.png') as im:
  width,height=im.size;im.convert('RGB').save(PREVIEWS/('resume-'+lang+'.webp'),quality=94,method=4)
 digest=hashlib.sha256(pdf.read_bytes()).hexdigest()
 manifest['/documents/resumes/'+filename]={'pages':[{'src':'/documents/previews/resume-'+lang+'.webp','width':width,'height':height}],'sourceSha256':digest}
 proof[lang]={'pages':1,'bytes':pdf.stat().st_size,'sha256':digest,'links':len(annotations),'textCharacters':len(text)}
manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
(OUT/'verification.json').write_text(json.dumps(proof,indent=2))
print(json.dumps(proof,indent=2))
