# [threeBrain - HTML, WebGL based 3D Viewer](https://dipterix.github.io/threeBrain/index.html)

[![CRAN_Status_Badge](https://www.r-pkg.org/badges/version/threeBrain)](https://cran.r-project.org/package=threeBrain)
[![license](https://img.shields.io/badge/license-GPL--3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0.en.html)
[![Travis build status](https://travis-ci.org/dipterix/threeBrain.svg?branch=master)](https://travis-ci.org/dipterix/threeBrain)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

<img src="https://github.com/dipterix/threeBrain/blob/master/docs/demo.gif?raw=true" width="100%" />

A live [demo]() is under construction!

* Click [here](https://dipterix.github.io/threeBrain/news/index.html) for the news
* For function usage, check [Reference page](https://dipterix.github.io/threeBrain/reference/index.html)
* Check [keyboard shortcuts](https://dipterix.github.io/threeBrain/shortcuts.html) here

## A. Installation

1. Install [`Python3`](https://www.python.org/downloads/), [`R`](https://cran.r-project.org/) and [`RStudio Desktop (Free Version)`](https://www.rstudio.com/products/rstudio/download/)
2. Open `RStudio`, enter from its console:
```r
install.packages("threeBrain")
```
If you want to install `dev` version from *Github*, then use:
```r
install.packages("devtools")
devtools::install_github("dipterix/threeBrain")
```
3. (Optional) Setups: after installation, in `RStudio` console, type the following command
```r
threeBrain::brain_setup()
```
and follow the instructions.

## B. Basic Brain Viewer

Once finishing setting up of `threeBrain`, there will be a template subject `N27` (Collin's 27) created at
```
~/rave_data/others/three_brain/N27
```
`~` is your home directory. For example on my laptop, it's `/Users/dipterix/`. On Windows, it's `C:\Users\dipterix\`.

Let's view this subject. The following commands all go to `RStudio` console.

1. Import subject
```r
n27 = freesurfer_brain(
    fs_subject_folder = '~/rave_data/others/three_brain/N27',
    subject_name = 'N27',
    additional_surfaces = c('white', 'smoothwm')
)
```
2. Visualize
```r
plot(x)       # alternatively, you can use `x$plot()`
```

## C. Directory Setup

`~/rave_data/others/three_brain/N27` is a sample generated by `FreeSurfer` ([download](https://surfer.nmr.mgh.harvard.edu/fswiki/DownloadAndInstall)). If you have any subjects processed by `FreeSurfer`, direct `fs_subject_folder` to your subject folder. 

## D. Add/Render Electrodes

If you have electrode file, you can import it before calling `plot` function. Please make sure it's in `csv` format.
```r
x$set_electrodes(electrodes = "[PATH to ELECTRODE FILE]")
```
Here is an example of electrode csv file. Only the first five columns (**case-sensitive**) are mandatory: `Electrode (integer)`, `Coord_x`, `Coord_y`, `Coord_z`, and `Label (character)`. `Coord_*` is `RAS` location from `FreeSurfer` coordinates.
```
| Electrode| Coord_x| Coord_y| Coord_z|Label  | MNI305_x|  MNI305_y|  MNI305_z|SurfaceElectrode |SurfaceType | Radius| VertexNumber|Hemisphere |
|---------:|-------:|-------:|-------:|:------|--------:|---------:|---------:|:----------------|:-----------|------:|------------:|:----------|
|         1|    29.0|    -7.8|   -34.6|RMHCH1 | 30.46817| -17.98119| -23.40022|FALSE            |pial        |      2|           -1|left       |
|         2|    33.8|    -8.0|   -34.2|RMHCH2 | 35.57109| -17.76624| -22.80131|FALSE            |pial        |      2|           -1|left       |
|         3|    38.0|    -7.5|   -33.5|RMHCH3 | 39.97102| -16.81249| -22.17986|FALSE            |white       |      2|           -1|right      |
|         4|    42.6|    -6.8|   -33.0|RMHCH4 | 44.79092| -15.73442| -21.82591|FALSE            |smoothwm    |      2|           -1|right      |
|         5|    47.0|    -6.8|   -32.6|RMHCH5 | 49.45370| -15.35431| -21.31272|FALSE            |pial        |      2|           -1|right      |
|         ...
```

To assign values to electrodes, run
```r
x$set_electrode_values(electrodes = "[PATH to ELECTRODE VALUE FILE]")
```

The electrode value file is also a csv like:

```
| Electrode| Subject| Project|    Time| ValueName| ValueName2|  ...|
|---------:|-------:|-------:|-------:|:---------|----------:|-----|
|         1|     N27|    Demo|       0|A         |   30.46817|  ...|
|         2|     N27|    Demo|       0|B         |   35.57109|  ...|
|         3|     N27|    Demo|       0|C         |   39.97102|  ...|
|         4|     N27|    Demo|       0|D         |   44.79092|  ...|
|         5|     N27|    Demo|       0|A         |   49.45370|  ...|
|         ...
```

`Project` and `Time` are optional. However, if you are also using [`rave`](https://github.com/beauchamplab/rave), please make sure `Project` exists. If you want to show animation, `Time` is necessary and must be numeric. `ValueName?` can be any characters containing letters (`A-Z`, `a-z`), letters (`0-9`) and underscore (`_`).


## E. Merge Subjects and Template mapping

If you have your own subjects with `FreeSurfer` output, for example, I have two subjects `YAB` and `YCQ`. To merge these two subjects and show them on `N27` template,
```r
# yab = ... (see section B for import a single subject)
# ycq = ...
template_n27 = threeBrain::merge_brain(yab, ycq, template_subject = 'N27')

plot( template_n27 )
```
The viewer will be in `N27` template, and electrodes of these two subjects can be mapped via `MNI305` (for surface and stereo EEG) or `std.141` (for surface-only).
