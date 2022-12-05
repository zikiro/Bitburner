/** @param {NS} ns */
export async function main(ns) {
	const target = ns.args[0];
	while (true) {
		const hostname = await ns.getHostname();
		const ram = await ns.getServerUsedRam(hostname);
		const maxRam = await ns.getServerMaxRam(hostname);
		const scriptRam = await ns.getScriptRam('maxWeaken.js');

		if ((ram + scriptRam) < maxRam && ram < 5000) {
			await ns.run('weaken.js', 1, target, ram);
		}
		await ns.sleep(1);
	}
}