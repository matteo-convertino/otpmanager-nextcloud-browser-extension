import { defineConfig } from 'wxt';
import { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  entrypointsDir: '../entrypoints',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Nextcloud OTP Manager',
    short_name: 'OTP Manager',
    description: 'Access your OTP Manager accounts from your Nextcloud server directly in the browser.',
    version: '1.0.0',
    permissions: ['storage', 'clipboardWrite'],
    host_permissions: ['https://*/*'],
    action: {
      default_title: 'OTP Manager'
    },
    browser_specific_settings: {
      gecko: {
        id: 'otpmanager-nextcloud-browser-extension@convertino.cloud'
      }
    }
  },
  vite: () => ({
    plugins: [
      babel({
        presets: [reactCompilerPreset()]
      }),
    ],
  }),
});
