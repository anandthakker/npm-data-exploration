/**
* Transforms an npm registry document down to just the blob size and dependencies.
*/
module.exports = function filter() {
  var self = this;
  var latest = this['dist-tags'] ? this['dist-tags'].latest : null;
  var versions = keys(this.versions);
  
  return {
    key: this.key,
    name: this.name,
    description: this.description,
    versions: versions.map(function(versionNumber) {
      var version = self.versions[versionNumber]

      // the tarball url.
      var tarball = version.dist && version.dist.tarball || '';
      var blob = findBlob(self.blobs, tarball);
      
      return {
        key: self.key,
        name: self.name,
        version: versionNumber,
        description: self.description,
        size: blob ? blob.size : null,
        dependencies: keys(version.dependencies),
        devDependencies: keys(version.devDependencies),
        latest: versionNumber === latest
      };
    })
  };
}

function keys(o) {
  var k = [];
  for(version in o) {
    k.push(version)
  }
  return k;
}

function findBlob(blobs, url) {
  for(key in blobs) if(blobs[key].link === url) return blobs[key];
  return null;
}
