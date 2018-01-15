$(function() {
	$('.modal').modal();
	$('#disclaimerModal').modal({
		dismissible: false,
		opacity: .95
	});
	if (!Cookies.get('tgscraper')) {
		$('#disclaimerModal').modal('open');
		$('#acknowledgeBtn').click(() => {
			if ($('#rememberCheck').prop('checked')) {
				Cookies.set('tgscraper', 'acknowledged', { expires: 7 });
				return $('#disclaimerModal').modal('close');
			};
			$('#disclaimerModal').modal('close');
		});
	};
	$('.newComment').click(function(event) {
		event.preventDefault();
		$('.formInput').val('');
		$('#post-id').html($(this).data('postid'));
		$('#commentModal').modal('open');
	});
	$('#submitComment').click(function(event) {
		event.preventDefault();
		if ($('#nameInput').val() !== '' && $('#commentInput').val() !== '') {
			let objComment = {
				userName: $('#nameInput').val(),
				postID: $('#post-id').text(),
				userIP: $('#user-ip').text(),
				comment: $('#commentInput').val(),
				date: moment().format('MMMM DD, YYYY')
			};
			$.post('/comments', objComment).done(() => {
				Materialize.toast('Comment Posted!', 3000);
				$('#commentModal').modal('close');
			});
			return true;
		};
		return false;
	});
	$('.viewComments').click(function() {
		$.get(`/comments/${$(this).data('postid')}`).done(comments => {
			if (comments.length === 0) {
				$('#commentsContainer').html('<li class="collection-item"><div class="row center-align"><div class="col s12"><h3>&#9785;</h3><p>No comments on this post!</p></div></div></li>');
				return $('#viewModal').modal('open');
			};
			$('#commentsContainer').empty();
			comments.map(val => {
				let commentCollection = `<li class="collection-item customHover" id="${val._id}"><div class="row"><div class="col s11"><div class="valign-wrapper text-bold"><i class="material-icons">fingerprint&nbsp;</i><p>IP Address:&nbsp;${val.userIP}</p></div></div><div class="col s1"><div class="valign-wrapper text-bold"><a class="btn-floating tooltipped waves-effect waves-light red deleteComment" data-commentid="${val._id}"><i class="material-icons">delete</i></a></div></div><div class="col s12"><div class="divider"></div></div><div class="col s12"><div class="valign-wrapper"><i class="material-icons">account_circle&nbsp;</i><p>Author:&nbsp;${val.userName}</p></div></div><div class="col s12"><div class="valign-wrapper"><i class="material-icons">comment&nbsp;</i><p>Comment:&nbsp;${val.comment}</p></div></div><div class="col s12"><div class="valign-wrapper"><i class="material-icons">date_range&nbsp;</i><p>Date:&nbsp;${val.date}</p></div></div></div></li>`;
				$('#commentsContainer').append(commentCollection);
				$('#viewModal').modal('open');
			});
		});
	});
	$(document).on('click', '.deleteComment', function() {
		$.ajax({
			url: `/comments/${$(this).data('commentid')}`,
			type: 'delete'
		}).done(() => {
			$(`#${$(this).data('commentid')}`).remove();
			Materialize.toast('Comment Deleted!', 3000);
			if ($('#commentsContainer').html() === '') {
				$('#commentsContainer').html('<li class="collection-item"><div class="row center-align"><div class="col s12"><h3>&#9785;</h3><p>No comments on this post!</p></div></div></li>');
			}
		});
	});
});