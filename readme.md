* PermissionsList...
		[
		{type: notification,data:{}},
		{type: audio,data:{audio: true }},
		{type: video,data:{video: false}},
		{type: location,data:{}},
		{type: sensor,data:{ name: "accelerometer" }}
		]

*Requestpermission...
		--notification = Notification.requestpermission()
		--audio = navigator.mediaDevices.getUserMedia()
		--video = navigator.mediaDevices.getUserMedia()
		--location= navigator.geolocation.getCurrentPosition(),
		-sensor = navigator.permissions.query()

