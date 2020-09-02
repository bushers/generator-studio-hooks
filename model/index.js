'use strict'; 

var Generator = require('yeoman-generator'); 
var _ = require("lodash");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // this.option('babel'); // This method adds support for a `--babel` flag

    this.argument('uiname', { type: String, required: true });

    this.uCamelCName = _.upperFirst(_.camelCase(this.options.uiname));
    this.camelCName = _.camelCase(this.options.uiname);
    this.lowerCName = this.options.uiname.toLowerCase();
    this.kebabCName = _.kebabCase(this.options.uiname);
    this.uSnakeCName = _.snakeCase(this.options.uiname).toUpperCase();

    this.folder = this.options["folder"] || "model"; 
  }

  initializing(){

  }
  prompting(){

  }
  configuring(){

  }
  writing(){
    this._copyFiles();
  }
  conflicts(){

  }
  install(){
  }
  end(){

  }

  _copyFiles(){
    let srcDir = this.config.get("srcDir"); ; 
    let dir = srcDir + 'src/models/';//+this.folder+'/'+ this.uCamelCName+'/';
    

    let tempStr = {
        kebabCName:this.kebabCName, 
        uCamelCName:this.uCamelCName, 
        lowerCName:this.lowerCName,
        uSnakeCName:this.uSnakeCName,
        camelCName:this.camelCName
    }

    this.fs.copyTpl(
      this.templatePath('Model.ts'),
      this.destinationPath(dir + this.uCamelCName +'.ts'),
      tempStr
    );


  }
};
