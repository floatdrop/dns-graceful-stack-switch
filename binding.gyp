{
  'targets': [
    {
      'target_name': 'bindings',
      'sources': [
        'src/cares_wrap.cc',
      ],
      'dependencies': [
        'deps/cares/cares.gyp:cares'
      ]
    }
  ]
}
