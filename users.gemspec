$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "users/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "users"
  s.version     = Users::VERSION
  s.authors     = ["Red Hat"]
  s.email       = ["foreman-dev@googlegroups.com"]
  s.homepage    = "http://theforeman.org"
  s.summary     = "Foretello Users UI"
  s.description = "Foretello Users UI"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails"

end
