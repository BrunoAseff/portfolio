'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { GitCommit, ExternalLink, AlertCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function LastCommit() {
  const t = useTranslations('aboutMe');
  const locale = useLocale();
  const [commit, setCommit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLastCommit = async () => {
      try {
        const response = await fetch('/api/last-commit');
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('notFound');
          } else {
            setError('fetchError');
          }
          return;
        }
        
        const data = await response.json();
        
        if (data.error) {
          setError('fetchError');
          return;
        }
        
        setCommit({
          sha: data.sha,
          commit: {
            message: data.message,
            author: {
              date: data.date,
            },
          },
          html_url: data.url,
          repository: data.repo,
        });
      } catch (error) {
        console.error('Error fetching last commit:', error);
        setError('fetchError');
      } finally {
        setLoading(false);
      }
    };

    fetchLastCommit();
  }, []);

  if (loading) {
    return (
      <Card className="bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <GitCommit size={24} className="text-white/80" />
          <h3 className="text-lg font-semibold text-white">{t('lastCommit')}</h3>
        </div>
        <div className="text-sm text-white/60">{t('loading')}</div>
      </Card>
    );
  }

  if (error || !commit) {
    return (
      <Card className="bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <GitCommit size={24} className="text-white/80" />
          <h3 className="text-lg font-semibold text-white">{t('lastCommit')}</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/60">
          <AlertCircle size={16} />
          <span>{error === 'notFound' ? t('noCommitsFound') : t('commitError')}</span>
        </div>
      </Card>
    );
  }

  const commitMessage = commit.commit.message.split('\n')[0];
  const commitDate = new Date(commit.commit.author.date);
  const timeAgo = getTimeAgo(commitDate, locale, t);

  return (
    <Link
      href={commit.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group h-full"
    >
      <Card className="bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <GitCommit size={24} className="text-white/80" />
          <h3 className="text-lg font-semibold text-white">{t('lastCommit')}</h3>
        </div>
        <div className="flex flex-col flex-grow">
          <p className="text-base font-medium text-white leading-relaxed line-clamp-2 group-hover:text-white/90 transition-colors mb-4">
            {commitMessage}
          </p>
          <div className="flex items-center justify-between text-sm text-white/70 mt-auto">
            <span className="font-mono">Repo: {commit.repository.name}</span>
            <div className="flex items-center gap-2">
              <span>{timeAgo}</span>
              <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function getTimeAgo(date, locale, t) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return t('timeAgo.justNow');
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return t('timeAgo.minutesAgo', { count: minutes });
  }
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return t('timeAgo.hoursAgo', { count: hours });
  }
  if (seconds < 2592000) {
    const days = Math.floor(seconds / 86400);
    return t('timeAgo.daysAgo', { count: days });
  }
  const months = Math.floor(seconds / 2592000);
  return t('timeAgo.monthsAgo', { count: months });
}

