import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FoodShare</h2>
            <p className="text-sm">Sharing blessings, one meal at a time.</p>
            <div className="flex space-x-4">
              <SocialIcon href="https://facebook.com" icon={<Facebook />} label="Facebook" />
              <SocialIcon href="https://twitter.com" icon={<Twitter />} label="Twitter" />
              <SocialIcon href="https://instagram.com" icon={<Instagram />} label="Instagram" />
              <SocialIcon href="https://linkedin.com" icon={<Linkedin />} label="LinkedIn" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/donate">Donate</FooterLink>
              <FooterLink to="/ask-help">Ask for Help</FooterLink>
              <FooterLink to="/volunteer">Volunteer</FooterLink>
              <FooterLink to="/login">Login</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/partnership">Our Partners</FooterLink>
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/tos">Terms Of Services</FooterLink>
              <FooterLink to="/privacypolicy">Privacy Policy</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p>123 Charity Lane</p>
              <p>Kindness City, KC 12345</p>
              <p>United States</p>
              <p className="mt-2">
                <a href="mailto:info@foodshare.org" className="flex items-center hover:text-green-200 transition-colors duration-200">
                  <Mail className="w-4 h-4 mr-2" />
                  info@foodshare.org
                </a>
              </p>
              <p>
                <a href="tel:+11234567890" className="hover:text-green-200 transition-colors duration-200">+1 (123) 456-7890</a>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-500">
          <p className="text-center text-sm">&copy; {new Date().getFullYear()} FoodShare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="hover:text-green-200 transition-colors duration-200">
        {children}
      </Link>
    </li>
  )
}

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-green-200 transition-colors duration-200"
      aria-label={label}
    >
      {icon}
    </a>
  )
}