'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Mail, Copy, Shield, Clock, Zap, CheckCircle, RefreshCw, Settings } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

const features = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'No registration required. Your privacy is our priority with end-to-end encryption.',
    badge: 'Secure',
  },
  {
    icon: Clock,
    title: 'Auto Expiry',
    description: 'Emails automatically expire after your chosen duration. No manual cleanup needed.',
    badge: 'Automated',
  },
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Generate temporary emails instantly with a single click. Ready to use immediately.',
    badge: 'Fast',
  },
];

const domains = [
  'tempmail.com',
  'quickmail.org', 
  'fastmail.net',
  'securemail.io'
];

export default function HomePage() {
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [customUsername, setCustomUsername] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(domains[0]);
  
  const generateEmail = async () => {
    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let newEmail;
    if (customMode && customUsername.trim()) {
      // Custom email without unique codes
      newEmail = `${customUsername.trim()}@${selectedDomain}`;
    } else {
      // Random email without unique codes
      const usernames = ['user', 'temp', 'mail', 'test', 'demo', 'guest'];
      const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
      newEmail = `${randomUsername}@${selectedDomain}`;
    }
    
    setGeneratedEmail(newEmail);
    setIsGenerating(false);
    
    toast.success('Temporary email generated successfully!');
  };
  
  const copyToClipboard = async () => {
    if (!generatedEmail) return;
    
    try {
      // Modern Clipboard API (for newer browsers)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(generatedEmail);
        toast.success('Email copied to clipboard!');
        return;
      }
      
      // Fallback method for older browsers and mobile
      const textArea = document.createElement('textarea');
      textArea.value = generatedEmail;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        toast.success('Email copied to clipboard!');
      } else {
        throw new Error('Copy command failed');
      }
    } catch (error) {
      console.error('Failed to copy email:', error);
      toast.error('Failed to copy email. Please copy manually.');
    }
  };
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary" className="px-3 py-1">
            🚀 Secure & Anonymous
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Temporary Email
            <span className="text-primary"> Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate secure, temporary email addresses instantly. Perfect for signups, 
            verifications, and protecting your real email from spam.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => {
              const generator = document.getElementById('generator');
              generator?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Mail className="mr-2 h-4 w-4" />
            Generate Email
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/inbox">
              View Inbox
            </Link>
          </Button>
        </div>
      </section>

      {/* Email Generator */}
      <section id="generator" className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Generator
            </CardTitle>
            <CardDescription>
              Generate a temporary email address that expires automatically
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mode Toggle */}
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Email Generation Mode</Label>
              <Button 
                variant={customMode ? "default" : "outline"} 
                size="sm"
                onClick={() => setCustomMode(!customMode)}
              >
                <Settings className="mr-2 h-4 w-4" />
                {customMode ? 'Custom Mode' : 'Random Mode'}
              </Button>
            </div>

            {/* Custom Email Form */}
            {customMode && (
              <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                <div className="space-y-2">
                  <Label htmlFor="username">Custom Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your preferred username"
                    value={customUsername}
                    onChange={(e) => setCustomUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domain">Select Domain</Label>
                  <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {domains.map((domain) => (
                        <SelectItem key={domain} value={domain}>
                          @{domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {customUsername && (
                  <div className="text-sm text-muted-foreground">
                    Preview: <span className="font-mono">{customUsername}@{selectedDomain}</span>
                  </div>
                )}
              </div>
            )}

            {/* Generated Email Display */}
            {generatedEmail ? (
              <Alert className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <AlertDescription className="flex-1">
                  <span className="font-mono text-sm break-all overflow-wrap-anywhere overflow-hidden">{generatedEmail}</span>
                </AlertDescription>
              </Alert>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {customMode ? 'Configure your custom email and click Generate' : 'Click "Generate Email" to create your temporary email address'}
              </div>
            )}
            
            <div className="flex gap-2">
              <Button 
                onClick={generateEmail} 
                disabled={isGenerating || (customMode && !customUsername.trim())}
                className="flex-1"
              >
                {isGenerating ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                {isGenerating ? 'Generating...' : 'Generate Email'}
              </Button>
              
              {generatedEmail && (
                <Button variant="outline" onClick={copyToClipboard}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              )}
            </div>
            
            {generatedEmail && (
              <div className="text-center">
                <Button variant="link" asChild>
                  <Link href="/inbox">
                    Check your inbox →
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Why Choose TempMail?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built with privacy and simplicity in mind. Get temporary emails 
            without compromising your security.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="relative group overflow-hidden border-0 bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-700/30 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300">
                    <feature.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/20 font-medium px-3 py-1">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Generate your first temporary email now and experience 
            the freedom of anonymous communication.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => {
              const generator = document.getElementById('generator');
              generator?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Mail className="mr-2 h-4 w-4" />
            Generate Email Now
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/settings">
              Customize Settings
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
