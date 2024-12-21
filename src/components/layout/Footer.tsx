'use client';

import { Link, Divider } from '@nextui-org/react';
import { Github, Twitter, Globe, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { APP_NAME, TRANSITIONS } from '@/constants';
import { Container } from './Container';

const socialLinks = [
  {
    href: 'https://nooro-us.com/',
    icon: Github,
    label: 'GitHub',
  },
  {
    href: 'https://nooro-us.com/',
    icon: Twitter,
    label: 'Twitter',
  },
  {
    href: 'https://nooro-us.com/',
    icon: Globe,
    label: 'Website',
  },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8">
      <Container>
        <div className="flex flex-col gap-8">
          {/* Top Section */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={TRANSITIONS.DEFAULT}
          >
            {/* Logo & Description */}
            <div className="flex flex-col items-center sm:items-start gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Heart className="h-4 w-4 text-primary" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
                  {APP_NAME}
                </span>
              </Link>
              <p className="text-small text-default-500 text-center sm:text-left">
               {'A simple task management app'}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  isExternal
                  href={link.href}
                  className="group relative"
                  title={link.label}
                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-default-100 rounded-md text-tiny opacity-0 group-hover:opacity-100 transition-opacity">
                    {link.label}
                  </span>
                  <div className="p-2 rounded-full hover:bg-default-100 transition-colors">
                    <link.icon 
                      size={18} 
                      className="text-default-500 group-hover:text-default-900 dark:group-hover:text-default-200 transition-colors" 
                    />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          <Divider className="bg-default-200/50" />

          {/* Bottom Section */}
          <motion.div 
            className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 text-small text-default-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...TRANSITIONS.DEFAULT, delay: 0.2 }}
          >
            {/* Copyright */}
            <div className="text-center sm:text-left">
              <p>
                © {currentYear} {APP_NAME}. All rights reserved.
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span>Built with</span>
                <Heart 
                  size={14} 
                  className="text-danger fill-danger animate-pulse" 
                />
                <span>by</span>
                <Link
                  href="https://www.linkedin.com/in/akhtar-zaman12/"
                  isExternal
                  className="text-primary hover:text-primary-500 transition-colors font-medium"
                >
                  NOORO
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </footer>
  );
} 