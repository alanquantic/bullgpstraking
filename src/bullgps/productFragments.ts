export type ProductSlug = 'assettrac' | 'eztrac' | 'eztrac-he' | 'eztrac-hw' | 'rfid' | 'smart7' | 'solarnet' | 'stealthnet'

import assettracHtml from './products/assettrac.fragment.html?raw'
import eztracHtml from './products/eztrac.fragment.html?raw'
import eztrac_heHtml from './products/eztrac-he.fragment.html?raw'
import eztrac_hwHtml from './products/eztrac-hw.fragment.html?raw'
import rfidHtml from './products/rfid.fragment.html?raw'
import smart7Html from './products/smart7.fragment.html?raw'
import solarnetHtml from './products/solarnet.fragment.html?raw'
import stealthnetHtml from './products/stealthnet.fragment.html?raw'

export const productFragments: Record<ProductSlug, string> = {
  'assettrac': assettracHtml,
  'eztrac': eztracHtml,
  'eztrac-he': eztrac_heHtml,
  'eztrac-hw': eztrac_hwHtml,
  'rfid': rfidHtml,
  'smart7': smart7Html,
  'solarnet': solarnetHtml,
  'stealthnet': stealthnetHtml,
}
