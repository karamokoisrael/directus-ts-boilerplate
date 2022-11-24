import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'mgx-interface-image',
	name: 'mgx-interface-image',
	icon: 'box',
	description: 'Display picture',
	component: InterfaceComponent,
	recommendedDisplays: ["mgx-display-image"],
	options: [
		{
			field: 'alt',
			name: 'alt',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'input',
			},
			schema: {
				default_value: "",
			},
		},
		{
			field: 'class',
			name: 'class',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'input',
			},
			schema: {
				default_value: "",
			},
		},
		{
			field: 'style',
			name: 'style',
			type: 'string',
			meta: {
				width: 'full',
				interface: 'input-code',
				language: "css"
			},
			schema: {
				default_value: "",
			},
		},
		{
			field: 'prefix',
			name: '$t:displays.formatted-value.prefix',
			type: 'string',
			meta: {
				width: 'full',
				interface: 'input',
				options: {
					label: '$t:displays.formatted-value.prefix_label',
					trim: false,
				},
			},
			schema: {
				default_value: "",
			},
		},
		{
			field: 'suffix',
			name: '$t:displays.formatted-value.suffix',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'input',
				options: {
					label: '$t:displays.formatted-value.suffix_label',
					trim: false,
				},
			},
			schema: {
				default_value: "",
			},
		},
	],
	types: ['string', 'uuid'],
	localTypes: ['file', 'standard'],
});
