'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Settings, Bell, Shield, Database, Trash2, Download } from 'lucide-react';
import { toast } from 'sonner';

const settingsSchema = z.object({
  emailDuration: z.string(),
  autoDelete: z.boolean(),
  notifications: z.boolean(),
  emailAlerts: z.boolean(),
  securityAlerts: z.boolean(),
  marketingEmails: z.boolean(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { handleSubmit, watch, setValue } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      emailDuration: '1h',
      autoDelete: true,
      notifications: true,
      emailAlerts: true,
      securityAlerts: true,
      marketingEmails: false,
    },
  });
  
  const onSubmit = (data: SettingsFormData) => {
    console.log('Settings saved:', data);
    toast.success('Settings saved successfully!');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and configurations
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Account Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Account Configuration
            </CardTitle>
            <CardDescription>
              Configure your temporary email settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="emailDuration">Email Duration</Label>
                <Select 
                  value={watch('emailDuration')} 
                  onValueChange={(value) => setValue('emailDuration', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10m">10 minutes</SelectItem>
                    <SelectItem value="30m">30 minutes</SelectItem>
                    <SelectItem value="1h">1 hour</SelectItem>
                    <SelectItem value="6h">6 hours</SelectItem>
                    <SelectItem value="24h">24 hours</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  How long should your temporary email remain active?
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoDelete">Auto Delete</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically delete emails after expiration
                  </p>
                </div>
                <Switch 
                  id="autoDelete"
                  checked={watch('autoDelete')}
                  onCheckedChange={(checked) => setValue('autoDelete', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Choose what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive browser notifications for new emails
                </p>
              </div>
              <Switch 
                id="notifications"
                checked={watch('notifications')}
                onCheckedChange={(checked) => setValue('notifications', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <Label>Notification Types</Label>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="emailAlerts"
                    checked={watch('emailAlerts')}
                    onCheckedChange={(checked) => setValue('emailAlerts', !!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="emailAlerts" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Email Alerts
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Get notified when new emails arrive
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="securityAlerts"
                    checked={watch('securityAlerts')}
                    onCheckedChange={(checked) => setValue('securityAlerts', !!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="securityAlerts" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Security Alerts
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Important security and privacy notifications
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="marketingEmails"
                    checked={watch('marketingEmails')}
                    onCheckedChange={(checked) => setValue('marketingEmails', !!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="marketingEmails" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Marketing Emails
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Product updates and feature announcements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Your privacy and security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Data Encryption</p>
                  <p className="text-sm text-muted-foreground">All emails are encrypted in transit and at rest</p>
                </div>
                <Badge variant="secondary">Enabled</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Auto-Expiry</p>
                  <p className="text-sm text-muted-foreground">Emails automatically expire based on your settings</p>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">No Logs Policy</p>
                  <p className="text-sm text-muted-foreground">We don&apos;t store any personal information or email content</p>
                </div>
                <Badge variant="secondary">Enforced</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription>
              Manage your data and account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Button variant="outline" className="justify-start">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              
              <Button variant="outline" className="justify-start">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All Emails
              </Button>
              
              <Button variant="destructive" className="justify-start">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}