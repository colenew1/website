import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ request, url }) => {
  const userAgent = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  // Only redirect if mobile AND arriving from outside the site (no internal referer)
  const isInternalNav = referer && new URL(referer, url.origin).origin === url.origin;

  if (isMobile && !isInternalNav) {
    throw redirect(302, '/links');
  }
};
