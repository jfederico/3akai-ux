/*!
 * Copyright 2014 Apereo Foundation (AF) Licensed under the
 * Educational Community License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 *     http://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

/**
 * jQuery plugin that will detect the clips that are present on the page, and
 * will take care of opening/collapsing them when clicked. When a user clicks
 * outside of an opened clip, the clip will be collapsed as well.
 */

define(['jquery'], function (jQuery) {
    (function($) {

        /**
         * Toggle clip visibility
         *
         * @param  {Object}  $clip  jQuery-wrapped clip to toggle
         */
        var toggleClip = function($clip) {
            // Toggle the ARIA attributes
            if ($('button', $clip).attr('aria-expanded') === 'true') {
                $('button', $clip).attr('aria-expanded', 'false');
                $('ul', $clip).attr('aria-hidden', 'true');
            } else {
                $('button', $clip).attr('aria-expanded', 'true');
                $('ul', $clip).attr('aria-hidden', 'false');
            }
            // Toggle the clip options
            $('ul', $clip).toggle();
            // Toggle the caret icons
            $('i.fa-caret-down, i.fa-caret-up', $clip).toggleClass('fa-caret-down fa-caret-up');
        };

        // Hook all clicks on document to close clips as appropriate
        $(document).on('click', function(ev) {
            // No changes to underlying clips if user is interacting with a modal
            if ($('.modal.in').length || $(ev.target).parents('.modal').length) {
                return;
            }

            // Get any clips that were target of click
            var $clip = $(ev.target).parents('.oae-clip-content');

            // If target clip allows actions and target was clip's button or one of
            // its children, toggle the clip
            if (($('i.fa-caret-down, i.fa-caret-up', $clip).length > 0) &&
                (($(ev.target).is('.oae-clip-content > button:not(:disabled)')) ||
                 ($(ev.target).parents('.oae-clip-content > button:not(:disabled)').length > 0))) {
                toggleClip($clip);
            }

            // Close any other open clips on page
            $('.oae-clip-content').has('ul:visible').not($clip).each(function() {
                toggleClip($(this));
            });
        });
    })(jQuery);
});
