<div id="<?php print $block_html_id ?>-nav-modal" class="elmsln-modal elmsln-modal-hidden side-nav disable-scroll" aria-label="<?php print t('Share this content'); ?>" aria-hidden="true" role="dialog" tabindex="-1">
  <div class="center-align valign-wrapper elmsln-modal-title-wrapper cis-lmsless-dark cis-lmsless-border">
    <h2 class="flow-text valign elmsln-modal-title white-text"><?php print t('Share');?></h2>
    <a href="#close-dialog" class="close-reveal-side-nav white-text" role="button" aria-label="<?php print t('Close shortcodes menu'); ?>" data-voicecommand="close (menu)" data-jwerty-key="Esc">&#215;</a>
  </div>
  <div class="elmsln-modal-content">
    <?php print $content; ?>
  </div>
</div>
