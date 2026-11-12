// Fictional credits only. Pure in-memory fixture; no external systems.
export function windowFor(runAt) {
  const d = new Date(runAt);
  if (Number.isNaN(d.getTime())) throw new Error('Invalid date');
  if (d.getUTCDay() !== 2 || d.getUTCHours() !== 9 || d.getUTCMinutes() !== 0 || d.getUTCSeconds() !== 0 || d.getUTCMilliseconds() !== 0) throw new Error('Settlement must run Tuesday 09:00 UTC');
  const upper = new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()-1));
  const lower = new Date(upper.getTime()-7*86400000);
  return {lower,upper};
}
export class SettlementService {
  constructor({faulty=false,payout=async()=>{},notify=async()=>{}}={}) {
    this.faulty=faulty; this.payout=payout; this.notify=notify;
    this.paidTasks=new Set(); this.ledger=[]; this.notifications=[];
  }
  async settle(tasks,runAt) {
    const {lower,upper}=windowFor(runAt);
    const eligible=tasks.filter(t=>t.status==='completed' && new Date(t.completedAt)>=lower && new Date(t.completedAt)<upper);
    const seen=new Set();
    const newTasks=eligible.filter(t=>{
      if(!t.id || seen.has(t.id)) return false;
      seen.add(t.id);
      return this.faulty || !this.paidTasks.has(t.id);
    });
    if (!newTasks.length) return {credits:0,ids:[],notification:'not-required'};
    const ids=newTasks.map(t=>t.id), credits=ids.length*10;
    // Atomic commit model: payout gateway resolves before recording success.
    await this.payout({ids,credits});
    this.ledger.push({ids,credits});
    for(const id of ids) this.paidTasks.add(id);
    try {await this.notify({ids,credits}); this.notifications.push({ids,credits}); return {ids,credits,notification:'sent'};}
    catch {return {ids,credits,notification:'failed'};}
  }
}
