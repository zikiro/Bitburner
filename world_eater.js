/** @param {NS} ns */
export async function main(ns) {
	const hosts = await ns.scan();
	const player = await ns.getPlayer();
	const wormFile = 'world_eater.js';
	const home = 'home';
	const hackingFile = 'secMinHGWW.js';
	// const weakenFile = 'weaken.js';
	// const playerServers = [home, "big", "liquid", "fnatic", "nip", "g2", "astralis", "mouz"];

	hosts.forEach(async (host) => {
		const server = await ns.getServer(host);
		const hackingFileIsRunning = await ns.isRunning(hackingFile, home, host);
		if (hackingFileIsRunning) return;
		if (server.purchasedByPlayer || server.hostname === 'darkweb' || server.hostname === 'home') return;
		if (player.skills.hacking < server.requiredHackingSkill) return;

		if (server.openPortCount < server.numOpenPortsRequired) {
			await ns.tprint('cracking ports: ', host);
			await ns.brutessh(host);
			await ns.ftpcrack(host);
			await ns.relaysmtp(host);
			await ns.httpworm(host);
			await ns.sqlinject(host);
		}
		await ns.asleep(100);
		if (!server.hasAdminRights) {
			await ns.tprint('nuking server: ', host);
			await ns.nuke(host);
		}
		await ns.asleep(10);

		if (ns.fileExists(wormFile, host)) {
			await ns.rm(wormFile, host)
		}
		await ns.asleep(10);
		await ns.tprint('copying worm: ', host);
		await ns.scp(wormFile, host);
		await ns.asleep(10);

		if(!ns.fileExists(wormFile, host) || server.maxRam < 1) {
			await ns.exec(hackingFile, home, 1, host);
			return;
		}

		if (!ns.isRunning(wormFile, host)) {
			await ns.tprint('executing worm: ', host);
			await ns.exec(wormFile, host);
		}
		await ns.asleep(10);

		await ns.tprint('executing secMinHGWW: ', host);
		await ns.exec(hackingFile, home, 1, host);
	})

}