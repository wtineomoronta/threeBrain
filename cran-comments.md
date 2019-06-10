# Update logs (for R-cran only)

## 2019-06-09

Version 0.1.2

Update JavaScript library, added scatter plot methods. Removed files in `inst/` 
that trigger warnings (like `installed.packages`). Await for approval.



## 2019-03-08

Version 0.1.0

* Passed cran check but rejected from manual checks

#### Rejected by `Swetlana Herbrandt`. 

Reason:

```
Thanks, please do not use installed.packages(). See help page of 
installed.packages():
"This can be slow when thousands of packages are installed, so do not 
use this to find out if a named package is installed (use system.file or 
find.package) nor to find out if a package is usable (call require and 
check the return value) nor to find details of a small number of 
packages (use packageDescription). It needs to read several files per 
installed package, which will be slow on Windows and on some 
network-mounted file systems."


Please do not change waning options (options(warn=-1)) in your functions.

Please add examples in your Rd-files.

Please fix and resubmit.
```

#### Check:

1. There's a file `AFNIio.R` in `inst/` folder that triggers these warnings. 
`threeBrain` doesn't need this file to function properly. 
However, it's not recommended to change the script due to compatibility issues. 
2. Also this file has lots of syntax mistakes. I plan to write my own afni readers 
in the later versions

#### Solution:

* `AFNIio.R` has been removed.
* Examples added to S3 functions `create_group`, `geom_freemesh` and `geom_sphere`. At current stage, not many geometry types are supported. Plan to add `plane` and `particle` system later on in the next big version, but these geometries are totally enough for iEEG/ECoG analysis.


## 2019-03-07

Version 0.1.0

* Self check has one note: `Possibly mis-spelled words in DESCRIPTION`
* Passed cran check but rejected by manual checks

#### Rejected by `Uwe Ligges`. 

Reason:

```
 The Description field should not start with the package name,
     'This package' or similar.

Please also single quote software names such as 'FreeSurfer'.
```

#### Solution:

Re-wrote DESCRIPTION, added single quotes to software names