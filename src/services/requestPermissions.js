const getPermissionStatus = (config) => navigator
	.permissions.query({ name: config });

const getMediaDevices = async (data) => {
	const { res = 'granted' } = await navigator.mediaDevices
		.getUserMedia(data)
		.catch(() => ({ res: 'denied' }));

	return res;
};
const requestPermissions = {
	notifications: () => Notification.requestPermission(),
	foregroundLocation: ({ pipe }) => {
		const success = () => {
			const resp = { status: 'granted',
				id: 'foregroundLocation', canAskAgain: true };

			pipe(resp);
		};

		const error = () => {
			const resp = { status: 'denied',
				id: 'foregroundLocation', canAskAgain: false };

			pipe(resp);
		};

		navigator.geolocation.getCurrentPosition(success, error);
	},
	camera: () => getMediaDevices({ video: true }),
	microphone: () => getMediaDevices({ audio: true }),
	midi: async () => {
		await navigator.requestMIDIAccess().catch(() => 'denied');
		const res = getPermissionStatus('midi');

		return res.state ;
	},
	localFonts: async () => {
		await window.queryLocalFonts();
		const res = await getPermissionStatus('local-fonts');

		return res.state;
	},
	hid: async () => {
		const res = await navigator.hid.requestDevice({ filters: [] });

		return res.length ? 'granted' : 'denied';
	},
	clipboard: async () => {
		await navigator.clipboard.read().catch(() => 'denied');
		const res = await getPermissionStatus('clipboard-read');

		return res.state;
	},
	usb: async () => {
		const { res = 'granted' } = await navigator.usb
			.requestDevice({ filters: [] })
			.catch(() => ({ res: 'denied' }));

		return res ;
	},
};

export default requestPermissions;
