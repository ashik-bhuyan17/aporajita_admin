/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function (config) {
  config.toolbar = [
    {
      name: 'document',
      items: ['Source', '-', 'Preview'],
    },
    {
      name: 'clipboard',
      items: ['Undo', 'Redo'],
    },
    {
      name: 'links',
      items: ['Link', 'Unlink', 'Anchor'],
    },
    {
      name: 'colors',
      items: ['TextColor', 'BGColor'],
    },
    {
      name: 'basicstyles',
      items: [
        'Bold',
        'Italic',
        'Underline',
        'Strike',
        'Subscript',
        'Superscript',
        '-',
        'RemoveFormat',
      ],
    },
    {
      name: 'insert',
      items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar'],
    },
    {
      name: 'styles',
      items: ['Styles', 'Format', 'Font', 'FontSize'],
    },
    {
      name: 'paragraph',
      items: [
        'NumberedList',
        'BulletedList',
        '-',
        'Outdent',
        'Indent',
        '-',
        'Blockquote',
        'CreateDiv',
        '-',
        'JustifyLeft',
        'JustifyCenter',
        'JustifyRight',
        'JustifyBlock',
      ],
    },
  ];
};
