jQuery(document).ready(function ($t) {
    var file_frame;
    var wp_media_post_id = wp.media.model.settings.post.id; // Store the old id
    var set_to_post_id = zts_media_attached_post_id.ID;// Set this

    jQuery('.zts_media_uploader_button').on('click', function( event ){
        event.preventDefault();
        window.dataToUpload = $t(this).attr('data-to-upload');
        window.dataType     = $t(this).attr('data-type');
        window.dataMediaID  = $t(this).attr('data-media-id');
        if ( file_frame ) {
            file_frame.uploader.uploader.param( 'post_id', set_to_post_id );
            file_frame.open();
            return;
        } else {
            wp.media.model.settings.post.id = set_to_post_id;
        }
        file_frame = wp.media.frames.file_frame = wp.media({
            title: 'Select a image to upload',
            button: {
                text: 'Use this image'
            },
            multiple: false
        });
        file_frame.on( 'select', function() {
            attachment = file_frame.state().get('selection').first().toJSON();
            if(window.dataType === "img"){
                $t(window.dataToUpload).append("<img src='"+attachment.url+"'/>");
            }
            else{
                $t(window.dataToUpload).attr('src',attachment.url);
            }
            $t(window.dataMediaID).val(attachment.id);
            wp.media.model.settings.post.id = wp_media_post_id;
        });
        file_frame.open();
    });
    jQuery( 'a.add_media' ).on( 'click', function() {
        wp.media.model.settings.post.id = wp_media_post_id;
    });
});