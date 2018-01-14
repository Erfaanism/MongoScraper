$(function() {
	$('#refreshBtn').click((event) => {
		event.preventDefault();
		console.log('working');
		$.ajax({
			url: '/refresh',
			type: 'GET'
		});
	});
});