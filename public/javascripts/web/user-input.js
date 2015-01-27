$(function(){
    $('#keymenu li a').click(function(){
        $('#keyspan').html($(this).text());
        $('#keyname').val($(this).attr('val'));
    });

    $('#btnSearch').click(function(){
        $('#mainForm').submit();
    });

    $('#btnUpdate').click(function(){
        $('#editForm').submit();
    });

    $('#btnRegister').click(function(){
        $('#registerForm').submit();
    });

    $('#btnUpdateGift').click(function(){
        $('#updateGiftForm').submit();
    });

    $('#btnUpdateAnnouncement').click(function(){
        $('#updateAnnouncementForm').submit();
    });
});