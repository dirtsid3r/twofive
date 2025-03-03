// Import all project images statically
import kollektifImage from '../public/images/kollektif.jpg';
import glassImage from '../public/images/glass.jpg';
import jmtCheckoutsImage from '../public/images/jmt-checkouts.jpg';
import jmtPrimeImage from '../public/images/jmt-prime.jpg';
import joyntImage from '../public/images/joynt.jpg';
import cambiumImage from '../public/images/cambium.jpg';

// Export a mapping of project IDs to their static imports
export const projectImages: Record<string, any> = {
  'kollektif': kollektifImage,
  'glass': glassImage,
  'jmt-checkouts': jmtCheckoutsImage,
  'jmt-prime': jmtPrimeImage,
  'joynt': joyntImage,
  'cambium': cambiumImage,
}; 