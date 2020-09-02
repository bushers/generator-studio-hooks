'use strict'; 

var Generator = require('yeoman-generator'); 
var _ = require("lodash");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // this.option('babel'); // This method adds support for a `--babel` flag

    this.argument('ctrlname', { type: String, required: true });

    this.uCamelCName = _.upperFirst(_.camelCase(this.options.ctrlname));
    this.camelCName = _.camelCase(this.options.ctrlname);
    this.lowerCName = this.options.ctrlname.toLowerCase();
    this.kebabCName = _.kebabCase(this.options.ctrlname);
    this.uSnakeCName = _.snakeCase(this.options.ctrlname).toUpperCase();
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
    let dir = 'src/controllers/'+ this.uCamelCName+'/';
    let tempStr = {
        kebabCName:this.kebabCName, 
        uCamelCName:this.uCamelCName, 
        lowerCName:this.lowerCName,
        uSnakeCName:this.uSnakeCName,
        camelCName:this.camelCName
    }
    this.fs.copyTpl(
      this.templatePath('Actions.ts'),
      this.destinationPath(dir +'Actions.ts'),
      tempStr
    );

    this.fs.copyTpl(
      this.templatePath('StateAndProps.ts'),
      this.destinationPath(dir +'StateAndProps.ts'),
      tempStr
    );

    this.fs.copyTpl(
      this.templatePath('Reducer.ts'),
      this.destinationPath(dir +'Reducer.ts'),
      tempStr
    );


    this.fs.copyTpl(
      this.templatePath('App.tsx'),
      this.destinationPath(dir + this.uCamelCName +'.tsx'),
      tempStr
    );


    this.fs.copyTpl(
      this.templatePath('_app.scss'),
      this.destinationPath(dir + '_' + this.lowerCName + '.scss'),
      tempStr
    );
  }
};
