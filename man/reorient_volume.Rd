% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/utils_orient.R
\name{reorient_volume}
\alias{reorient_volume}
\title{Function to reshape data to `RAS` order}
\usage{
reorient_volume(volume, Norig)
}
\arguments{
\item{volume, }{3-mode tensor (voxels), usually from `mgz`, `nii`, or `BRIK` files}

\item{Norig}{a \code{4x4} transform matrix mapping volume (`CRS`) to `RAS`}
}
\value{
Reshaped tensor with dimensions corresponding to `R`, `A`, and `S`
}
\description{
Function to reshape data to `RAS` order
}
