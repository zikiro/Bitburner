/** @param {NS} ns */
export async function main(ns) {
	const hosts = ["foodnstuff", "sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea", "harakiri-sushi", "neo-net", "zer0", "max-hardware", "iron-gym", "phantasy", "silver-helix", "omega-net", "crush-fitness", "johnson-ortho", "the-hub", "computek", "netlink", "rothman-uni", "catalyst", "summit-uni", "rho-construction", "millenium-fitness", "aevum-police", "alpha-ent", "syscore", "lexo-corp", "snap-fitness", "global-pharm", "applied-energetics", "unitalife", "univ-energy", "nova-med", "zb-def", "zb-institute", "vitalife", "titan-labs", "solaris", "microdyne", "helios", "deltaone", "icarus", "zeus-med", "omnia", "defcomm", "galactic-cyber", "infocomm", "taiyang-digital", "stormtech", "aerocorp", "clarkinc", "omnitek", "nwo", "4sigma", "blade", "b-and-a", "ecorp", "fulcrumtech", "megacorp", "kuai-gong", "fulcrumassets", "powerhouse-fitness"];
	const player = ns.getPlayer();
	const home = 'home';
	const hackingFile = 'secMinHGWW.js';
	// const weakenFile = 'weaken.js';
	// const playerServers = [home, "big", "liquid", "fnatic", "nip", "g2", "astralis", "mouz"];

	ns.tprint('hosts found: ', hosts);
	hosts.forEach(async (host) => {
		ns.tprint('starting for: ', host);
		const server = ns.getServer(host);
		const hackingFileIsRunning = ns.isRunning(hackingFile, home, host);
		if (hackingFileIsRunning) {
			ns.tprint('hacking file running: ', host);
			ns.tprint('skipping: ', host);
			return;
		}
		if (server.purchasedByPlayer || server.hostname === 'darkweb' || server.hostname === 'home') {
			ns.tprint(host, ' is non hackable server');
			ns.tprint('skipping: ', host);
			return;
		}
		if (player.skills.hacking < server.requiredHackingSkill) {
			ns.tprint('hacking level is too low!');
			ns.tprint('skipping: ', host);
			return;
		}

		if (server.openPortCount < server.numOpenPortsRequired) {
			ns.tprint('cracking ports: ', host);
			if (ns.fileExists("BruteSSH.exe", home)) {
				ns.brutessh(host);
			}
			if (ns.fileExists("FTPCrack.exe", home)) {
				ns.ftpcrack(host);
			}
			if (ns.fileExists("relaySMTP.exe", home)) {
				ns.relaysmtp(host);
			}
			if (ns.fileExists("HTTPWorm.exe", home)) {
				ns.httpworm(host);
			}
			if (ns.fileExists("SQLInject.exe", home)) {
				ns.sqlinject(host);
			}
		}

		if (server.openPortCount < server.numOpenPortsRequired) {
			ns.tprint('not enough ports open on host: ', host);
			return;
		}

		if (!server.hasAdminRights) {
			ns.tprint('nuking server: ', host);
			ns.nuke(host);
		}

		ns.tprint('executing secMinHGWW: ', host);
		ns.exec(hackingFile, home, 1, host);
		ns.tprint('finishing for: ', host);

	});

}