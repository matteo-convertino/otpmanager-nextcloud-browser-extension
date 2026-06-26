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
    description: 'Official Nextcloud OTP Manager browser extension',
    version: '1.0.0',
    permissions: ['storage', 'clipboardWrite'],
    host_permissions: ['https://*/*'],
    action: {
      default_title: 'OTP Manager'
    },
    browser_specific_settings: {
      gecko: {
        id: 'otpmanager-nextcloud-browser-extension@convertino.cloud',
        data_collection_permissions: {
          required: ['authenticationInfo']
        }
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
