'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2, Search, RotateCcw, AlertTriangle } from 'lucide-react';
import ClientVirtualList from '@/components/ClientVirtualList';

// Mock trashed emails data
const mockTrashedEmails = [
  {
    id: 'trash-1',
    from: 'spam@suspicious-site.com',
    subject: 'You\'ve won $1,000,000! Claim now!',
    preview: 'Congratulations! You are our lucky winner. Click here to claim...',
    timestamp: '2024-01-10T14:20:00Z',
    isRead: false,
    deletedAt: '2024-01-11T09:30:00Z',
    autoDeleteAt: '2024-02-10T09:30:00Z'
  },
  {
    id: 'trash-2',
    from: 'old-newsletter@outdated.com',
    subject: 'Weekly Newsletter - December 2023',
    preview: 'Here\'s what happened this week in our community...',
    timestamp: '2023-12-28T10:00:00Z',
    isRead: true,
    deletedAt: '2024-01-10T15:45:00Z',
    autoDeleteAt: '2024-02-09T15:45:00Z'
  },
  {
    id: 'trash-3',
    from: 'notifications@old-app.com',
    subject: 'Account deletion confirmation',
    preview: 'Your account has been successfully deleted as requested...',
    timestamp: '2024-01-08T11:30:00Z',
    isRead: true,
    deletedAt: '2024-01-09T12:00:00Z',
    autoDeleteAt: '2024-02-08T12:00:00Z'
  },
  {
    id: 'trash-4',
    from: 'marketing@unwanted.com',
    subject: 'Special offer just for you!',
    preview: 'Don\'t miss out on this limited-time offer...',
    timestamp: '2024-01-07T16:15:00Z',
    isRead: false,
    deletedAt: '2024-01-08T08:20:00Z',
    autoDeleteAt: '2024-02-07T08:20:00Z'
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

function getDaysUntilAutoDelete(autoDeleteDate: string) {
  const deleteDate = new Date(autoDeleteDate);
  const now = new Date();
  const diffInDays = Math.ceil((deleteDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diffInDays);
}

export default function TrashPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const filteredEmails = mockTrashedEmails.filter(email =>
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

  const handleRestore = () => {
    // In real app, this would make API call to restore emails
    console.log('Restoring emails:', selectedEmails);
    setSelectedEmails([]);
  };

  const handlePermanentDelete = () => {
    // In real app, this would make API call to permanently delete emails
    console.log('Permanently deleting emails:', selectedEmails);
    setSelectedEmails([]);
  };

  const handleEmptyTrash = () => {
    // In real app, this would make API call to empty entire trash
    console.log('Emptying trash');
    setSelectedEmails([]);
  };

  const EmailItem = ({ email }: { email: typeof mockTrashedEmails[0] }) => {
    const daysLeft = getDaysUntilAutoDelete(email.autoDeleteAt);
    
    return (
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
                  <Badge 
                    variant={daysLeft <= 7 ? "destructive" : "outline"} 
                    className="text-xs"
                  >
                    {daysLeft === 0 ? 'Deletes today' : `${daysLeft}d left`}
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
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <Trash2 className="h-3 w-3" />
                <span>Deleted {formatDate(email.deletedAt)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trash2 className="h-8 w-8" />
          <div>
            <h1 className="text-3xl font-bold">Trash</h1>
            <p className="text-muted-foreground">
              {filteredEmails.length} emails in trash • Auto-delete after 30 days
            </p>
          </div>
        </div>
        
        {filteredEmails.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Empty Trash
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Empty Trash?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all {filteredEmails.length} emails in trash. 
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleEmptyTrash}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Empty Trash
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search trash..."
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
              onClick={handleRestore}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Restore ({selectedEmails.length})
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Forever ({selectedEmails.length})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Delete Forever?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete {selectedEmails.length} selected email(s). 
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handlePermanentDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete Forever
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
            <Trash2 className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="text-xl mb-2">Trash is empty</CardTitle>
            <CardDescription className="text-center max-w-md">
              {searchQuery 
                ? `No emails found in trash matching "${searchQuery}"`
                : 'Deleted emails will appear here and be automatically removed after 30 days.'
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