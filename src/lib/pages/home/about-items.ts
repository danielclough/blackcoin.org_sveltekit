import { 
	faStar,
	faUser,
	faEye,
} from '@fortawesome/free-regular-svg-icons'
import {
	faTree,
	faCode,
	faBolt,
} from '@fortawesome/free-solid-svg-icons'

export default [
	{
		side: 'left',
		h3: 'proof_of_stake_v3',
		p: 'users_who_stake',
		a: 'read_more',
		url: 'https://blackcoin.org/faq/',
		faIcon: faStar,
	},
	{
		side: 'left',
		h3: 'eco_friendly',
		p: 'no_mining',
		faIcon: faTree,
		a: 'read_more',
		url: 'https://blackcoin.org/faq/'
	},
	{
		side: 'left',
		h3: 'transparent_ledger',
		p: 'entirely_transparent',
		faIcon: faUser,
		a: 'read_more',
		url: 'https://blackcoin.org/faq/'
	},
	{
		side: 'right',
		faIcon: faCode,
		h3: 'fast',
		p: 'to_anyone_in_seconds',
		a: 'read_more',
		url: 'https://blackcoin.org/faq/'
	},
	{
		side: 'right',
		faIcon: faBolt,
		h3: 'open_source',
		p: 'can_be_audited',
		a: 'read_more',
		url: 'https://blackcoin.org/faq/'
	},
	{
		side: 'right',
		faIcon: faEye,
		h3: 'anonymous',
		p: 'no_identifying_information',
		a: 'read_more',
		url: 'https://blackcoin.org/faq/'
	}
];
