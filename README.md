# PolymerFFKit

PolymerFFKit is an interactive binary-only toolkit for polymer force-field preparation and topology generation. It helps researchers move from atomistic trajectories to mapped AA/UA/CG trajectories, geometry statistics, bonded parameter fitting, non-bonded parameter assignment, randomized polymer sequences, and simulation-ready GROMACS or LAMMPS topology files.

This public repository is intended for the user-facing website, documentation, templates, license/disclaimer files, and binary release assets only. The source code is not distributed publicly.

Version: `v1.0.0`

Institution: Department of Chemistry, Zhejiang University

Contact: tongshi@zju.edu.cn

## Download

Use the GitHub Release assets:

- [Windows x64 ZIP](https://github.com/liuychgroup/PolymerFFKit/releases/latest/download/PolymerFFKit-v1.0.0-windows-x64.zip)
- [Linux x64 tar.gz](https://github.com/liuychgroup/PolymerFFKit/releases/latest/download/PolymerFFKit-v1.0.0-linux-x64.tar.gz)
- [macOS Intel ZIP](https://github.com/liuychgroup/PolymerFFKit/releases/latest/download/PolymerFFKit-v1.0.0-macos-x64.zip)
- [macOS Apple Silicon ZIP](https://github.com/liuychgroup/PolymerFFKit/releases/latest/download/PolymerFFKit-v1.0.0-macos-arm64.zip)

Windows quick start:

```powershell
.\PolymerFFKit.exe
```

Linux quick start:

```bash
tar -xzf PolymerFFKit-v1.0.0-linux-x64.tar.gz
cd PolymerFFKit
chmod +x PolymerFFKit
./PolymerFFKit
```

## Main Workflows

PolymerFFKit is menu driven. The main menu contains two workflow families.

1. Trajectory Analysis and Force Field Generation
   - Step 11: map or extract AA/UA/CG trajectories from `.xyz` input.
   - Step 12: extract bond, angle, and dihedral geometry statistics.
   - Step 13: fit bonded force-field constants from binned PMF CSV data.
   - Step 14: assign non-bonded parameters and export a unified force-field JSON.

2. Polymer Sequence and Topology Builder
   - Step 21: generate randomized polymer sequences from residue ratios.
   - Step 22: build 3D structures and export PDB, GROMACS ITP/TOP, and LAMMPS DATA files.

## Documentation

- [Project website](docs/index.html)
- [中文手册 HTML](docs/manual/中文手册.html)
- [中文手册 PDF](docs/manual/中文手册.pdf)
- [English Manual HTML](docs/manual/English_Manual.html)
- [English Manual PDF](docs/manual/English_Manual.pdf)
- [Build and publish guide](BUILD_AND_PUBLISH.md)
- [Basic input templates](input_templates-1)
- [Workflow example templates](input_templates-2)
- [Binary-only distribution notice](BINARY_ONLY_NOTICE.md)
- [Public release checklist](PUBLIC_RELEASE_CHECKLIST.md)

The GitHub Pages website lives in `docs/`. Enable GitHub Pages with `docs/` as the publishing source.

## Input Templates

Templates are provided for every input file format used by the current program:

- `templates/sequence_config_template.json`
- `templates/sequence_file_template.txt`
- `templates/xyz_trajectory_template.xyz`
- `templates/mapping_rules_template.json`
- `templates/fitting_histogram_csv_template.csv`
- `templates/fitted_params_template.txt`
- `templates/external_charges_template.txt`
- `templates/unified_config_template.json`
- `templates/gromacs_itp_template.itp`

## Important Notes

- The current program is interactive and does not expose command-line subcommands.
- Use single-character repeat unit symbols for sequence strings that will be passed into the topology builder, for example `A`, `B`, `C`. Multi-character bead names can still be used in mapping rules and force-field assignment.
- Step 12 writes a raw analysis text dump. Step 13 reads a binned CSV file, so histogram/binning may need to be prepared from the raw values before fitting.
- Step 22 requires a unified config JSON that contains `atom_naming`; the default Step 14 output may need to be extended with the atom naming section before topology generation.

## Distribution Policy

The public GitHub project should contain documentation, templates, website files, and binary release assets only. Do not publish `src/`, private build outputs, crash reports, IDE folders, or implementation files.
