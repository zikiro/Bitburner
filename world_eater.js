/** @param {NS} ns */
export async function main(ns) {
	const hosts = ns.scan();
	const player = ns.getPlayer();
	const wormFile = 'world_eater.js';
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

		if (ns.fileExists(wormFile, host)) {
			ns.rm(wormFile, host)
		}
		ns.tprint('copying worm: ', host);
		ns.scp(wormFile, host);

		if (!ns.fileExists(wormFile, host) || server.maxRam < 1) {
			ns.exec(hackingFile, home, 1, host);
			return;
		}

		if (!ns.isRunning(wormFile, host)) {
			ns.tprint('executing worm: ', host);
			ns.exec(wormFile, host);
		}

		ns.tprint('executing secMinHGWW: ', host);
		ns.exec(hackingFile, home, 1, host);
		ns.tprint('finishing for: ', host);

	});

}