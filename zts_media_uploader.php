<?php
/**
 * Plugin name: ZTS Media Uploader
 * Version: 0.4
 * Description: Simple Media Uploader Library. Powered by WordPress Core
 * Author: Vadim Kopeykin (c) Zts
 */
if(!class_exists("ZtsMediaUploaderSimple")){
    class ZtsMediaUploaderSimple
    {
        function __construct()
        {
            add_action('admin_enqueue_scripts' , array($this , 'includeAdminMediaScripts'));
        }

        function includeAdminMediaScripts()
        {
            wp_enqueue_media();
            $attachPostID = get_option( 'media_selector_attachment_id', 0 );
            wp_enqueue_script('zts-media-uploader-simple-script' , plugins_url().'/zts_media_uploader/assets/events.js',array('jquery'),'1.0',true);
            wp_localize_script('zts-media-uploader-simple-script' , "zts_media_attached_post_id" , array("ID"=>$attachPostID));
        }
    }

}
new ZtsMediaUploaderSimple();