/** @param {NS} ns */
export async function main(ns) {
const hosts = ns.scan();

hosts.forEach(host => {
	ns.tprint(host, ': ', ns.getServerMaxMoney(host));
})

}