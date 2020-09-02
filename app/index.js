'use strict';

var Generator = require('yeoman-generator');
var _ = require("lodash");

module.exports = class extends Generator {

    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        // Next, add your custom code
        // this.option('babel'); // This method adds support for a `--babel` flag
        // This makes `appname` a required argument.
        this.argument('appname', { type: String, required: true });
        this.config.set("isStory", this.options["is-story"] && true || false)

        let srcDir = this.options["src-dir"] ? this.appendSlash(this.options["src-dir"]) : "";
        this.config.set("srcDir", srcDir)
        this.config.set("excludePublic", this.options["exclude-public"] && true || false)

        // And you can then access it later; e.g.
        this.options.appname = _.kebabCase(this.options.appname);
        this.log(_.kebabCase(this.options.appname));
    }

    initializing() {

    }
    prompting() {

    }
    configuring() {

    }
    writing() {
        this._copyFiles();
    }
    conflicts() {

    }
    install() {
        // this.npmInstall();
    }
    end() {

    }

    appendSlash(str){
        let s = str[str.length - 1];
        if (s !== "/"){
            return str + "/"
        }
        return str;
    }

    _copyFiles() {
        let excludePublic = this.config.get("excludePublic");
        let srcDir = this.config.get("srcDir");
        let isStory = this.config.get("isStory");

        let ignoreFiles = ["**/.DS_Store"];

        if(!isStory){
            ignoreFiles.push("**/*.stories.tsx")
        }else{
            this.fs.copyTpl(
                this.templatePath('storybook/**'),
                this.destinationPath('.storybook/'),
                {
                    srcDir:srcDir,
                    globOptions: {
                        dot: true,
                        ignore: ignoreFiles
                    }
                }
            );
        }

        if (!excludePublic) {
            this.fs.copyTpl(
                this.templatePath('public/**'),
                this.destinationPath(srcDir +'public/'),
                {},
                {},
                {
                    globOptions: {
                        dot: true,
                        ignore: ignoreFiles
                    }
                }
            );
        }

        this.fs.copyTpl(
            this.templatePath('src/**'),
            this.destinationPath(srcDir + 'src/'),
            {
                appname: this.options.appname
            },
            {},
            {

                globOptions: {
                    dot: true,
                    ignore: ignoreFiles
                }
            }
        );

        this.fs.copy(
            this.templatePath('s.gitignore'),
            this.destinationPath('.gitignore')
        );

        this.fs.copyTpl(
            this.templatePath('config.rb'),
            this.destinationPath('config.rb'),
            {srcDir:srcDir}
        );

        this.fs.copyTpl(
            this.templatePath('fuse.js'),
            this.destinationPath('fuse.js'),
            {srcDir:srcDir}
        );

        this.fs.copy(
            this.templatePath('README.md'),
            this.destinationPath('README.md')
        );

        this.fs.copy(
            this.templatePath('.prettierrc.js'),
            this.destinationPath('.prettierrc.js')
        );

        this.fs.copy(
            this.templatePath('.eslintrc.js'),
            this.destinationPath('.eslintrc.js')
        );

        this.fs.copyTpl(
            this.templatePath('tsconfig.json'),
            this.destinationPath('tsconfig.json'),
            {srcDir:srcDir}
        );

        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            {
                appname: this.options.appname,
                isStory:this.config.get("isStory")
            }
        );
    }
};
