/** @param {NS} ns */
export async function main(ns) {
	const hostname = ns.getHostname();
	const host = ns.args[0];
	const script = ns.args[1];
	const amount = ns.args[2];
	const threads = ns.args[3];

	for (let i = 0; i < amount; i++) {
		ns.exec(script, hostname, threads, host, i);
		await ns.sleep(1);
	}

}