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

    this.folder = this.options["folder"] || "ui"; 
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
    console.log(this.config.getAll())
    let srcDir = this.config.get("srcDir"); 
    let isStory = this.config.get("isStory"); 
    let dir = srcDir + 'src/components/'+this.folder+'/'+ this.uCamelCName+'/';
    

    let tempStr = {
        kebabCName:this.kebabCName, 
        uCamelCName:this.uCamelCName, 
        lowerCName:this.lowerCName,
        uSnakeCName:this.uSnakeCName,
        camelCName:this.camelCName
    }

    this.fs.copyTpl(
      this.templatePath('Pr.tsx'),
      this.destinationPath(dir + this.uCamelCName +'.tsx'),
      tempStr
    );


    this.fs.copyTpl(
      this.templatePath('_pr.scss'),
      this.destinationPath(dir + '_' + this.lowerCName + '.scss'),
      tempStr
    );

    if(isStory){
      this.fs.copyTpl(
        this.templatePath('Pr.stories.tsx'),
        this.destinationPath(dir + this.uCamelCName +'.stories.tsx'),
        tempStr
      );
    }
  }
};
