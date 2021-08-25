#__Studio Template Generator__

##Getting started

install Yeoman and generator-studio-hooks globally

```
npm install yo -g
npm install generator-studio-hooks -g
```


##How it works

To create the project template run the following

##studio
```

yo studio-hooks {AppName}

```
Where {AppName} is the name of the application

###Flags
```

--src-dir {directory}   // in case the src files will
                        // need to sit on a different
                        // directory specifies the directory

--exclude-public    // flag if the public folder
                    // should be excluded when
                    // generating the project
```


##UI Component
To create a React class component run the following

```
yo studio-hooks:ui {UiName}
```
Where {UiName} is the name of the ui component

###Flags
```
--folder {folderName}   // specify a folder name
                        // under under components for files to be generated
                        // default value "ui"
```

##Presentation Component (Functional component)
To create a React function component run the following

```
yo studio-hooks:pr {PrName}
```
Where {PrName} is the name of the functional component

###Flags
```
--folder {folderName}   // specify a folder name
                        // under under components for files to be generated
                        // default value "ui"
```

###Flags
```
--folder {folderName}   // specify a folder name
                        // under under components for files to be generated
                        // default value "ui"
```
