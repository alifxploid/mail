'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Archive, Search, Trash2, RotateCcw, Mail } from 'lucide-react';
import ClientVirtualList from '@/components/ClientVirtualList';

// Mock archived emails data
const mockArchivedEmails = [
  {
    id: 'arch-1',
    from: 'newsletter@techcrunch.com',
    subject: 'Weekly Tech Digest - AI Breakthroughs',
    preview: 'This week in tech: Major AI developments, startup funding rounds...',
    timestamp: '2024-01-15T10:30:00Z',
    isRead: true,
    archivedAt: '2024-01-16T09:15:00Z'
  },
  {
    id: 'arch-2', 
    from: 'support@github.com',
    subject: 'Security Alert: New login detected',
    preview: 'We detected a new login to your GitHub account from...',
    timestamp: '2024-01-14T16:45:00Z',
    isRead: true,
    archivedAt: '2024-01-15T08:20:00Z'
  },
  {
    id: 'arch-3',
    from: 'billing@vercel.com',
    subject: 'Your monthly usage report',
    preview: 'Here\'s your usage summary for January 2024...',
    timestamp: '2024-01-13T12:00:00Z',
    isRead: true,
    archivedAt: '2024-01-14T14:30:00Z'
  },
  {
    id: 'arch-4',
    from: 'team@figma.com',
    subject: 'New features in Figma Dev Mode',
    preview: 'Discover the latest updates to help bridge design and development...',
    timestamp: '2024-01-12T09:15:00Z',
    isRead: false,
    archivedAt: '2024-01-13T11:45:00Z'
  },
  {
    id: 'arch-5',
    from: 'notifications@linkedin.com',
    subject: 'Weekly network update',
    preview: 'See what your connections have been up to this week...',
    timestamp: '2024-01-11T18:30:00Z',
    isRead: true,
    archivedAt: '2024-01-12T10:00:00Z'
  }
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInHours < 168) {
    return `${Math.floor(diffInHours / 24)}d ago`;
  } else {
    // Use consistent date format to avoid hydration mismatch
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const filteredEmails = mockArchivedEmails.filter(email =>
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectEmail = (emailId: string) => {
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmails.length === filteredEmails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredEmails.map(email => email.id));
    }
  };

  const handleUnarchive = () => {
    // In real app, this would make API call to unarchive emails
    console.log('Unarchiving emails:', selectedEmails);
    setSelectedEmails([]);
  };

  const handleDelete = () => {
    // In real app, this would make API call to move emails to trash
    console.log('Moving to trash:', selectedEmails);
    setSelectedEmails([]);
  };

  const EmailItem = ({ email }: { email: typeof mockArchivedEmails[0] }) => (
    <Card className={`cursor-pointer transition-colors hover:bg-muted/50 ${
      selectedEmails.includes(email.id) ? 'bg-muted border-primary' : ''
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={selectedEmails.includes(email.id)}
            onChange={() => handleSelectEmail(email.id)}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-muted-foreground truncate">
                {email.from}
              </span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Archived {formatDate(email.archivedAt)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDate(email.timestamp)}
                </span>
              </div>
            </div>
            <h3 className={`font-medium mb-1 truncate ${
              email.isRead ? 'text-muted-foreground' : 'text-foreground'
            }`}>
              {email.subject}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {email.preview}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Archive className="h-8 w-8" />
          <div>
            <h1 className="text-3xl font-bold">Archive</h1>
            <p className="text-muted-foreground">
              {filteredEmails.length} archived emails
            </p>
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search archived emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {selectedEmails.length > 0 && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUnarchive}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Unarchive ({selectedEmails.length})
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="flex items-center gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Delete ({selectedEmails.length})
            </Button>
          </div>
        )}
      </div>

      {/* Select All */}
      {filteredEmails.length > 0 && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedEmails.length === filteredEmails.length}
            onChange={handleSelectAll}
          />
          <span className="text-sm text-muted-foreground">
            Select all {filteredEmails.length} emails
          </span>
        </div>
      )}

      <Separator />

      {/* Email List */}
      {filteredEmails.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Archive className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="text-xl mb-2">No archived emails</CardTitle>
            <CardDescription className="text-center max-w-md">
              {searchQuery 
                ? `No archived emails found matching "${searchQuery}"`
                : 'Your archived emails will appear here. Archive emails from your inbox to keep them organized.'
              }
            </CardDescription>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          <ClientVirtualList
            data={filteredEmails}
            itemContent={(index, email) => <EmailItem key={email.id} email={email} />}
          />
        </div>
      )}
    </div>
  );
}