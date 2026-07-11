import { json } from '@sveltejs/kit';

export function GET() {
  return json({
    rules: [
      {
        patterns: ['/[^/]+/settings/.*'],
        properties: { context: 'modal' }
      }
    ]
  });
}
