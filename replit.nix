{ pkgs }: 
let
    node2nix = import ./node2nix.nix { inherit pkgs; };
    package = node2nix.package;
in {
	deps = [
		pkgs.nodejs-16_x
        pkgs.nodePackages.typescript-language-server
        pkgs.nodePackages.yarn
        pkgs.replitPackages.jest
    pkgs.gh
    pkgs.nnn
    pkgs.ranger
		pkgs.chromium
    pkgs.fish
    pkgs.bash_5
    pkgs.tldr
    pkgs.tree
    pkgs.bc
	];
}


