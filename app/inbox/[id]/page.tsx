import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Reply, Forward, Archive, Trash2, Download, Paperclip } from 'lucide-react';
import Link from 'next/link';

// Mock email data - generate dynamic emails to match inbox list
const getEmailById = (id: string) => {
  // Extract email index from ID format 'email-0', 'email-1', etc.
  const emailIndex = id.startsWith('email-') ? parseInt(id.split('-')[1]) : -1;
  
  if (emailIndex === -1 || emailIndex < 0 || emailIndex >= 100) {
    return null;
  }
  
  // Generate email data that matches the inbox list
  const sampleContents = [
    {
      from: 'welcome@shopify.com',
      subject: 'Welcome to Shopify! Your store is ready 🎉',
      content: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #5C6AC4 0%, #4F46E5 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 600;">Welcome to Shopify!</h1>
            <p style="color: #E0E7FF; font-size: 16px; margin: 10px 0 0 0;">Your online store is now ready to go live</p>
          </div>
          
          <div style="padding: 30px 20px;">
            <h2 style="color: #1F2937; font-size: 20px; margin: 0 0 20px 0;">🚀 Next Steps to Launch Your Store</h2>
            
            <div style="background: #F9FAFB; border-left: 4px solid #5C6AC4; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 16px;">✅ Store Setup Complete</h3>
              <p style="color: #6B7280; margin: 0; line-height: 1.5;">Your store "TechGadgets Pro" is configured and ready for customers.</p>
            </div>
            
            <div style="margin: 25px 0;">
              <h3 style="color: #374151; font-size: 18px; margin: 0 0 15px 0;">Quick Actions:</h3>
              <ul style="color: #6B7280; line-height: 1.6; padding-left: 20px;">
                <li>Add your first products to the catalog</li>
                <li>Customize your store theme and branding</li>
                <li>Set up payment methods (PayPal, Stripe)</li>
                <li>Configure shipping rates and policies</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: #5C6AC4; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Launch Your Store</a>
            </div>
            
            <div style="background: #FEF3C7; border: 1px solid #F59E0B; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #92400E; margin: 0; font-size: 14px;">💡 <strong>Pro Tip:</strong> Complete your store setup within 7 days to get a free premium theme worth $180!</p>
            </div>
          </div>
          
          <div style="background: #F9FAFB; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
            <p style="color: #6B7280; margin: 0; font-size: 14px;">Need help? Our support team is available 24/7</p>
            <p style="color: #374151; margin: 5px 0 0 0; font-weight: 600;">The Shopify Team</p>
          </div>
        </div>
      `,
      attachments: [
        { name: 'store-setup-guide.pdf', size: '2.1 MB' },
        { name: 'theme-customization-tips.pdf', size: '856 KB' },
      ],
    },
    {
      from: 'orders@amazon.com',
      subject: 'Your order has been shipped - Tracking #1Z999AA1234567890',
      content: `
        <div style="font-family: Amazon Ember, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: #232F3E; padding: 20px; text-align: center;">
            <h1 style="color: #FF9900; font-size: 24px; margin: 0;">📦 Your order is on the way!</h1>
          </div>
          
          <div style="padding: 25px 20px;">
            <div style="background: #E8F5E8; border: 1px solid #4CAF50; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h2 style="color: #2E7D32; margin: 0 0 10px 0; font-size: 18px;">✅ Shipped Successfully</h2>
              <p style="color: #388E3C; margin: 0;">Your package is now in transit and will arrive soon!</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background: #F8F9FA;">
                <td style="padding: 12px; border: 1px solid #DEE2E6; font-weight: 600; color: #495057;">Order Number:</td>
                <td style="padding: 12px; border: 1px solid #DEE2E6; color: #212529;">#112-7856341-1234567</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #DEE2E6; font-weight: 600; color: #495057;">Tracking Number:</td>
                <td style="padding: 12px; border: 1px solid #DEE2E6; color: #212529;">1Z999AA1234567890</td>
              </tr>
              <tr style="background: #F8F9FA;">
                <td style="padding: 12px; border: 1px solid #DEE2E6; font-weight: 600; color: #495057;">Estimated Delivery:</td>
                <td style="padding: 12px; border: 1px solid #DEE2E6; color: #212529;">Tomorrow by 8:00 PM</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #DEE2E6; font-weight: 600; color: #495057;">Carrier:</td>
                <td style="padding: 12px; border: 1px solid #DEE2E6; color: #212529;">UPS Ground</td>
              </tr>
            </table>
            
            <h3 style="color: #232F3E; font-size: 16px; margin: 25px 0 15px 0;">Items in this shipment:</h3>
            <div style="border: 1px solid #DEE2E6; border-radius: 8px; overflow: hidden;">
              <div style="padding: 15px; border-bottom: 1px solid #DEE2E6;">
                <div style="display: flex; align-items: center; gap: 15px;">
                  <div style="width: 60px; height: 60px; background: #F8F9FA; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #6C757D;">📱</div>
                  <div style="flex: 1;">
                    <h4 style="margin: 0 0 5px 0; color: #232F3E; font-size: 14px;">iPhone 15 Pro Max - 256GB Natural Titanium</h4>
                    <p style="margin: 0; color: #6C757D; font-size: 12px;">Qty: 1 | $1,199.00</p>
                  </div>
                </div>
              </div>
              <div style="padding: 15px;">
                <div style="display: flex; align-items: center; gap: 15px;">
                  <div style="width: 60px; height: 60px; background: #F8F9FA; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #6C757D;">🔌</div>
                  <div style="flex: 1;">
                    <h4 style="margin: 0 0 5px 0; color: #232F3E; font-size: 14px;">Apple USB-C to Lightning Cable (2m)</h4>
                    <p style="margin: 0; color: #6C757D; font-size: 12px;">Qty: 1 | $29.00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: #FF9900; color: #232F3E; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: 600; display: inline-block; margin-right: 10px;">Track Package</a>
              <a href="#" style="background: #232F3E; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: 600; display: inline-block;">View Order</a>
            </div>
          </div>
          
          <div style="background: #F8F9FA; padding: 20px; text-align: center; border-top: 1px solid #DEE2E6;">
            <p style="color: #6C757D; margin: 0; font-size: 14px;">Questions about your order? We're here to help!</p>
            <p style="color: #232F3E; margin: 5px 0 0 0; font-weight: 600;">Amazon Customer Service</p>
          </div>
        </div>
      `,
      attachments: [
        { name: 'invoice-112-7856341.pdf', size: '245 KB' },
        { name: 'return-policy.pdf', size: '89 KB' },
      ],
    },
    {
      from: 'security@github.com',
      subject: '🔒 Security Alert: New sign-in from Windows device',
      content: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: #DC2626; padding: 25px 20px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 600;">🔒 Security Alert</h1>
            <p style="color: #FEE2E2; font-size: 16px; margin: 10px 0 0 0;">New sign-in detected on your account</p>
          </div>
          
          <div style="padding: 30px 20px;">
            <div style="background: #FEF2F2; border: 1px solid #FECACA; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h2 style="color: #991B1B; margin: 0 0 15px 0; font-size: 18px;">⚠️ Account Access Notification</h2>
              <p style="color: #7F1D1D; margin: 0; line-height: 1.5;">We detected a new sign-in to your GitHub account from a device we don't recognize.</p>
            </div>
            
            <h3 style="color: #374151; font-size: 16px; margin: 0 0 15px 0;">Sign-in Details:</h3>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden;">
              <tr style="background: #F9FAFB;">
                <td style="padding: 12px 15px; border-bottom: 1px solid #E5E7EB; font-weight: 600; color: #374151;">Time:</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #E5E7EB; color: #6B7280;">January 15, 2025 at 2:34 PM UTC</td>
              </tr>
              <tr>
                <td style="padding: 12px 15px; border-bottom: 1px solid #E5E7EB; font-weight: 600; color: #374151;">Device:</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #E5E7EB; color: #6B7280;">Windows 11 - Chrome Browser</td>
              </tr>
              <tr style="background: #F9FAFB;">
                <td style="padding: 12px 15px; border-bottom: 1px solid #E5E7EB; font-weight: 600; color: #374151;">Location:</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #E5E7EB; color: #6B7280;">Jakarta, Indonesia (IP: 103.xxx.xxx.xxx)</td>
              </tr>
              <tr>
                <td style="padding: 12px 15px; font-weight: 600; color: #374151;">User Agent:</td>
                <td style="padding: 12px 15px; color: #6B7280; font-size: 12px;">Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0</td>
              </tr>
            </table>
            
            <div style="background: #FFFBEB; border: 1px solid #FDE68A; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #92400E; margin: 0 0 10px 0; font-size: 16px;">🛡️ Was this you?</h3>
              <p style="color: #B45309; margin: 0 0 15px 0; line-height: 1.5;">If you recognize this activity, you can ignore this email. If you don't recognize this activity, please secure your account immediately.</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: #DC2626; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; margin-right: 10px;">Secure My Account</a>
              <a href="#" style="background: #6B7280; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Review Activity</a>
            </div>
            
            <div style="background: #F3F4F6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #374151; margin: 0 0 10px 0; font-size: 14px;">🔐 Security Recommendations:</h4>
              <ul style="color: #6B7280; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.5;">
                <li>Enable two-factor authentication (2FA)</li>
                <li>Use a strong, unique password</li>
                <li>Review your authorized applications</li>
                <li>Keep your recovery information up to date</li>
              </ul>
            </div>
          </div>
          
          <div style="background: #F9FAFB; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
            <p style="color: #6B7280; margin: 0; font-size: 14px;">This is an automated security notification from GitHub</p>
            <p style="color: #374151; margin: 5px 0 0 0; font-weight: 600;">GitHub Security Team</p>
          </div>
        </div>
      `,
      attachments: [],
    },
    {
      from: 'newsletter@techcrunch.com',
      subject: '🚀 The Daily Crunch: AI breakthrough, startup funding, and tech news',
      content: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #00D4AA 0%, #00B894 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 700;">The Daily Crunch</h1>
            <p style="color: #B2F5EA; font-size: 16px; margin: 10px 0 0 0;">Your daily dose of tech news and insights</p>
            <p style="color: #E6FFFA; font-size: 14px; margin: 5px 0 0 0;">January 15, 2025 | Issue #1,247</p>
          </div>
          
          <div style="padding: 30px 20px;">
            <h2 style="color: #2D3748; font-size: 22px; margin: 0 0 20px 0; border-bottom: 2px solid #00D4AA; padding-bottom: 10px;">🔥 Top Stories Today</h2>
            
            <div style="border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; margin-bottom: 25px;">
              <div style="background: #F7FAFC; padding: 20px;">
                <h3 style="color: #2D3748; margin: 0 0 10px 0; font-size: 18px;">🤖 OpenAI Announces GPT-5 with Revolutionary Capabilities</h3>
                <p style="color: #4A5568; margin: 0 0 15px 0; line-height: 1.6;">The latest AI model shows unprecedented reasoning abilities and can now handle complex multi-modal tasks with human-level performance across various domains.</p>
                <a href="#" style="color: #00B894; text-decoration: none; font-weight: 600; font-size: 14px;">Read Full Story →</a>
              </div>
            </div>
            
            <div style="border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; margin-bottom: 25px;">
              <div style="background: #F7FAFC; padding: 20px;">
                <h3 style="color: #2D3748; margin: 0 0 10px 0; font-size: 18px;">💰 Startup Funding Roundup: $2.3B Raised This Week</h3>
                <p style="color: #4A5568; margin: 0 0 15px 0; line-height: 1.6;">Notable deals include a $500M Series C for climate tech startup CarbonCure and a $300M round for fintech company PayFlow.</p>
                <a href="#" style="color: #00B894; text-decoration: none; font-weight: 600; font-size: 14px;">View All Deals →</a>
              </div>
            </div>
            
            <div style="background: #EDF2F7; padding: 20px; border-radius: 12px; margin: 25px 0;">
              <h3 style="color: #2D3748; margin: 0 0 15px 0; font-size: 18px;">📊 Market Watch</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="text-align: center;">
                  <p style="color: #4A5568; margin: 0; font-size: 12px;">NASDAQ</p>
                  <p style="color: #38A169; margin: 5px 0 0 0; font-size: 18px; font-weight: 600;">+2.4%</p>
                </div>
                <div style="text-align: center;">
                  <p style="color: #4A5568; margin: 0; font-size: 12px;">Crypto Market</p>
                  <p style="color: #E53E3E; margin: 5px 0 0 0; font-size: 18px; font-weight: 600;">-1.2%</p>
                </div>
              </div>
            </div>
            
            <h3 style="color: #2D3748; font-size: 18px; margin: 25px 0 15px 0;">📱 Quick Bites</h3>
            <ul style="color: #4A5568; line-height: 1.8; padding-left: 20px;">
              <li>Apple announces new MacBook Pro with M4 chip</li>
              <li>Tesla's FSD beta now available in 15 new countries</li>
              <li>Meta launches new VR headset with improved resolution</li>
              <li>Google Cloud announces major infrastructure expansion</li>
            </ul>
            
            <div style="background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%); padding: 25px; border-radius: 12px; text-align: center; margin: 30px 0;">
              <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 20px;">🎯 Featured: TC Sessions</h3>
              <p style="color: #E2E8F0; margin: 0 0 20px 0; line-height: 1.5;">Join us for exclusive interviews with tech leaders and startup founders. Next session: "The Future of AI in Healthcare"</p>
              <a href="#" style="background: #ffffff; color: #667EEA; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Register Now</a>
            </div>
          </div>
          
          <div style="background: #F7FAFC; padding: 25px 20px; text-align: center; border-top: 1px solid #E2E8F0;">
            <p style="color: #4A5568; margin: 0 0 10px 0; font-size: 14px;">Thanks for reading The Daily Crunch!</p>
            <p style="color: #718096; margin: 0; font-size: 12px;">You're receiving this because you subscribed to TechCrunch newsletters</p>
            <div style="margin: 15px 0 0 0;">
              <a href="#" style="color: #00B894; text-decoration: none; font-size: 12px; margin: 0 10px;">Unsubscribe</a>
              <a href="#" style="color: #00B894; text-decoration: none; font-size: 12px; margin: 0 10px;">Manage Preferences</a>
            </div>
          </div>
        </div>
      `,
      attachments: [],
    },
    {
      from: 'notifications@linkedin.com',
      subject: '👥 You have 5 new connection requests and job opportunities',
      content: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: #0A66C2; padding: 25px 20px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 600;">LinkedIn</h1>
            <p style="color: #B3D4F1; font-size: 16px; margin: 10px 0 0 0;">Your professional network is growing!</p>
          </div>
          
          <div style="padding: 30px 20px;">
            <div style="background: #F3F6F8; border-left: 4px solid #0A66C2; padding: 20px; margin-bottom: 25px;">
              <h2 style="color: #2E2E2E; margin: 0 0 10px 0; font-size: 18px;">👥 5 New Connection Requests</h2>
              <p style="color: #5A5A5A; margin: 0;">Professionals in your industry want to connect with you</p>
            </div>
            
            <div style="border: 1px solid #E0E0E0; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
              <div style="padding: 15px; border-bottom: 1px solid #E0E0E0;">
                <div style="display: flex; align-items: center; gap: 15px;">
                  <div style="width: 50px; height: 50px; background: #0A66C2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 600;">JS</div>
                  <div style="flex: 1;">
                    <h4 style="margin: 0 0 5px 0; color: #2E2E2E; font-size: 16px;">John Smith</h4>
                    <p style="margin: 0; color: #5A5A5A; font-size: 14px;">Senior Software Engineer at Google</p>
                  </div>
                  <a href="#" style="background: #0A66C2; color: #ffffff; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px;">Accept</a>
                </div>
              </div>
              <div style="padding: 15px; border-bottom: 1px solid #E0E0E0;">
                <div style="display: flex; align-items: center; gap: 15px;">
                  <div style="width: 50px; height: 50px; background: #0A66C2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 600;">MJ</div>
                  <div style="flex: 1;">
                    <h4 style="margin: 0 0 5px 0; color: #2E2E2E; font-size: 16px;">Maria Johnson</h4>
                    <p style="margin: 0; color: #5A5A5A; font-size: 14px;">Product Manager at Microsoft</p>
                  </div>
                  <a href="#" style="background: #0A66C2; color: #ffffff; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px;">Accept</a>
                </div>
              </div>
              <div style="padding: 15px; text-align: center;">
                <a href="#" style="color: #0A66C2; text-decoration: none; font-size: 14px; font-weight: 600;">View all 5 requests →</a>
              </div>
            </div>
            
            <div style="background: #F0F8FF; border: 1px solid #B3D4F1; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #0A66C2; margin: 0 0 15px 0; font-size: 18px;">💼 Jobs You Might Be Interested In</h3>
              
              <div style="margin-bottom: 15px;">
                <h4 style="margin: 0 0 5px 0; color: #2E2E2E; font-size: 16px;">Senior Full Stack Developer</h4>
                <p style="margin: 0 0 5px 0; color: #5A5A5A; font-size: 14px;">TechCorp Inc. • Remote • $120k-$150k</p>
                <p style="margin: 0; color: #0A66C2; font-size: 12px;">2 mutual connections work here</p>
              </div>
              
              <div style="margin-bottom: 15px;">
                <h4 style="margin: 0 0 5px 0; color: #2E2E2E; font-size: 16px;">Lead Frontend Engineer</h4>
                <p style="margin: 0 0 5px 0; color: #5A5A5A; font-size: 14px;">StartupXYZ • San Francisco, CA • $130k-$160k</p>
                <p style="margin: 0; color: #0A66C2; font-size: 12px;">Skills match: React, TypeScript, Node.js</p>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <a href="#" style="background: #0A66C2; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: 600;">View All Jobs</a>
              </div>
            </div>
            
            <div style="background: #FFFBF0; border: 1px solid #FFD700; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #B8860B; margin: 0 0 10px 0; font-size: 16px;">🌟 Boost Your Profile</h4>
              <p style="color: #8B7355; margin: 0 0 10px 0; font-size: 14px;">Your profile is 85% complete. Add skills and get 2x more profile views!</p>
              <a href="#" style="color: #B8860B; text-decoration: none; font-size: 14px; font-weight: 600;">Complete Profile →</a>
            </div>
          </div>
          
          <div style="background: #F3F6F8; padding: 20px; text-align: center; border-top: 1px solid #E0E0E0;">
            <p style="color: #5A5A5A; margin: 0; font-size: 14px;">Stay connected with your professional network</p>
            <p style="color: #2E2E2E; margin: 5px 0 0 0; font-weight: 600;">The LinkedIn Team</p>
          </div>
        </div>
      `,
      attachments: [],
    },
    {
      from: 'billing@stripe.com',
      subject: '💳 Payment successful - Invoice #inv_1234567890',
      content: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: #635BFF; padding: 25px 20px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 600;">Payment Successful</h1>
            <p style="color: #C7D2FE; font-size: 16px; margin: 10px 0 0 0;">Thank you for your payment</p>
          </div>
          
          <div style="padding: 30px 20px;">
            <div style="background: #F0FDF4; border: 1px solid #BBF7D0; padding: 20px; border-radius: 8px; margin-bottom: 25px; text-align: center;">
              <h2 style="color: #166534; margin: 0 0 10px 0; font-size: 20px;">✅ $99.00 USD</h2>
              <p style="color: #15803D; margin: 0; font-size: 16px;">Payment processed successfully</p>
            </div>
            
            <h3 style="color: #374151; font-size: 18px; margin: 0 0 20px 0;">Payment Details</h3>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden;">
              <tr style="background: #F9FAFB;">
                <td style="padding: 12px 15px; border-bottom: 1px solid #E5E7EB; font-weight: 600; color: #374151;">Invoice Number:</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #E5E7EB; color: #6B7280;">#inv_1234567890</td>
              </tr>
              <tr>
                <td style="padding: 12px 15px; border-bottom: 1px solid #E5E7EB; font-weight: 600; color: #374151;">Payment Date:</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #E5E7EB; color: #6B7280;">January 15, 2025</td>
              </tr>
              <tr style="background: #F9FAFB;">
                <td style="padding: 12px 15px; border-bottom: 1px solid #E5E7EB; font-weight: 600; color: #374151;">Payment Method:</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #E5E7EB; color: #6B7280;">•••• •••• •••• 4242 (Visa)</td>
              </tr>
              <tr>
                <td style="padding: 12px 15px; border-bottom: 1px solid #E5E7EB; font-weight: 600; color: #374151;">Transaction ID:</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #E5E7EB; color: #6B7280;">txn_3MtwBwLkdIwHu7ix28thHz2f</td>
              </tr>
              <tr style="background: #F9FAFB;">
                <td style="padding: 12px 15px; font-weight: 600; color: #374151;">Receipt URL:</td>
                <td style="padding: 12px 15px;"><a href="#" style="color: #635BFF; text-decoration: none;">View Receipt</a></td>
              </tr>
            </table>
            
            <h3 style="color: #374151; font-size: 18px; margin: 25px 0 15px 0;">Items Purchased</h3>
            
            <div style="border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden;">
              <div style="background: #F9FAFB; padding: 15px; border-bottom: 1px solid #E5E7EB;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <h4 style="margin: 0 0 5px 0; color: #374151; font-size: 16px;">Pro Plan Subscription</h4>
                    <p style="margin: 0; color: #6B7280; font-size: 14px;">Monthly billing • Next charge: Feb 15, 2025</p>
                  </div>
                  <div style="text-align: right;">
                    <p style="margin: 0; color: #374151; font-size: 16px; font-weight: 600;">$99.00</p>
                  </div>
                </div>
              </div>
              
              <div style="padding: 15px; background: #FAFAFA;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: #374151; font-weight: 600;">Total</span>
                  <span style="color: #374151; font-size: 18px; font-weight: 600;">$99.00 USD</span>
                </div>
              </div>
            </div>
            
            <div style="background: #F0F9FF; border: 1px solid #BAE6FD; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h4 style="color: #0369A1; margin: 0 0 10px 0; font-size: 16px;">📊 What's Included in Pro Plan</h4>
              <ul style="color: #0284C7; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                <li>Unlimited API requests</li>
                <li>Advanced analytics dashboard</li>
                <li>Priority customer support</li>
                <li>Custom integrations</li>
                <li>99.9% uptime SLA</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: #635BFF; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; margin-right: 10px;">Download Invoice</a>
              <a href="#" style="background: #6B7280; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Manage Billing</a>
            </div>
          </div>
          
          <div style="background: #F9FAFB; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
            <p style="color: #6B7280; margin: 0; font-size: 14px;">Questions about your payment? Contact our support team</p>
            <p style="color: #374151; margin: 5px 0 0 0; font-weight: 600;">Stripe Billing Team</p>
          </div>
        </div>
      `,
      attachments: [
        { name: 'invoice-inv_1234567890.pdf', size: '156 KB' },
        { name: 'payment-receipt.pdf', size: '89 KB' },
      ],
    }
  ];
  
  // Use modulo to cycle through sample contents
  const contentIndex = emailIndex % sampleContents.length;
  const sampleContent = sampleContents[contentIndex];
  
  return {
    id: id,
    from: sampleContent.from,
    to: 'temp.user.12345@tempmail.com',
    subject: `Email Subject ${emailIndex + 1}`,
    date: new Date(Date.now() - (emailIndex * 3600000)).toISOString(), // Different times
    content: sampleContent.content,
    attachments: sampleContent.attachments,
    isRead: (emailIndex % 10) > 3, // Deterministic read status (~70% read)
  };
};

interface EmailDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EmailDetailPage({ params }: EmailDetailPageProps) {
  const { id } = await params;
  const email = getEmailById(id);
  
  if (!email) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/inbox">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Inbox
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Email not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <Button variant="ghost" size="sm" asChild className="w-full sm:w-auto">
          <Link href="/inbox">
            <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-sm sm:text-base">Back to Inbox</span>
          </Link>
        </Button>
        
        <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto overflow-x-auto">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-3 flex-shrink-0">
            <Reply className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Reply</span>
          </Button>
          <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-3 flex-shrink-0">
            <Forward className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Forward</span>
          </Button>
          <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-3 flex-shrink-0">
            <Archive className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Archive</span>
          </Button>
          <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-3 flex-shrink-0">
            <Trash2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </div>

      <Card className="mx-2 sm:mx-0">
        <CardHeader className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0">
            <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
              <CardTitle className="text-lg sm:text-xl md:text-2xl leading-tight break-words">{email.subject}</CardTitle>
              <CardDescription className="text-xs sm:text-sm break-all">
                From: <span className="font-medium">{email.from}</span>
              </CardDescription>
              <CardDescription className="text-xs sm:text-sm break-all">
                To: <span className="font-medium">{email.to}</span>
              </CardDescription>
              <CardDescription className="text-xs sm:text-sm">
                Date: {new Date(email.date).toLocaleString()}
              </CardDescription>
            </div>
            <Badge variant={email.isRead ? 'secondary' : 'default'} className="text-xs sm:text-sm flex-shrink-0">
              {email.isRead ? 'Read' : 'Unread'}
            </Badge>
          </div>
        </CardHeader>
        
        {email.attachments.length > 0 && (
          <>
            <Separator />
            <CardContent className="p-3 sm:pt-6 sm:px-6">
              <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2">
                <Paperclip className="h-3 w-3 sm:h-4 sm:w-4" />
                Attachments ({email.attachments.length})
              </h3>
              <div className="space-y-2">
                {email.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                      <Paperclip className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium truncate">{attachment.name}</span>
                      <Badge variant="outline" className="text-xs flex-shrink-0">{attachment.size}</Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="flex-shrink-0 h-6 w-6 sm:h-8 sm:w-8 p-0">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </>
        )}
        
        <Separator />
        
        <CardContent className="p-3 sm:pt-6 sm:px-6">
          <ScrollArea className="h-[300px] sm:h-[400px] md:h-[500px] w-full">
            <div 
              className="prose prose-xs sm:prose-sm max-w-none text-xs sm:text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: email.content }}
            />
          </ScrollArea>
        </CardContent>
      </Card>
      
      {/* Quick Actions */}
      <Card className="mx-2 sm:mx-0">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="flex flex-col sm:flex-row flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">
                  <Reply className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Reply
                </Button>
              </DialogTrigger>
              <DialogContent className="mx-2 sm:mx-auto max-w-sm sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-base sm:text-lg">Reply to Email</DialogTitle>
                  <DialogDescription className="text-xs sm:text-sm">
                    This is a temporary email service. Replies are not supported.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">
              <Archive className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Archive
            </Button>
            
            <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">
              <Trash2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}