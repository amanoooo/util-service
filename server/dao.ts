import { getPool } from './mysql'
import camelcaseKeys from 'camelcase-keys';
import { OssRow, UserRow, RssRow, Novel, InsertRes } from '../types';


export async function queryOssRows(type = 'NOVEL', pageSize: number, pageNum: number) {
  const from = (pageNum - 1) * pageSize
  const offset = pageSize

  const pool = await getPool()
  const [rows] = await pool.query('SELECT * FROM oss WHERE `type` = ? ORDER BY id DESC LIMIT ? , ' + offset, [type, from])
  return camelcaseKeys(rows)
}
export async function queryNovelRow(id: number, chapter: number): Promise<Novel[]> {
  const pool = await getPool()
  const [rows] = await pool.query(`SELECT * FROM novel WHERE oss_id = ${id} AND chapter_index = ${chapter} `)
  //@ts-ignore
  return camelcaseKeys(rows)
}
export async function queryRssRows(conn: any, userId: number, ossId: number) {
  const [rows] = await conn.query(`SELECT * FROM rss WHERE user_id = ${userId} AND oss_id = ${ossId} `)
  return camelcaseKeys(rows)
}

export async function queryNovelChapters(id: number) {
  const pool = await getPool()

  const [rows] = await pool.query(`SELECT chapter_index, chapter_title FROM novel WHERE oss_id = ${id} `)
  return camelcaseKeys(rows)
}
export async function insertOss(oss: OssRow) {
  const pool = await getPool()

  const [result] = await pool.query(`INSERT INTO oss SET ?  `, [oss])
  return result
}
export async function insertUser(conn: any, user: Partial<UserRow>): Promise<InsertRes> {
  const [result] = await conn.query(`INSERT INTO user SET ?  `, [user])
  return result
}
export async function insertRss(conn: any, rss: RssRow) {
  const [result] = await conn.query(`INSERT INTO rss SET ?  `, [rss])
  return result
}
export async function queryOssWithOption(name: string, crawlUrl: string) {
  const suffix = crawlUrl ? ' AND crawl_url = "' + crawlUrl + '" ' : ''
  const pool = await getPool()

  const [rows] = await pool.query(`SELECT * FROM oss where name = ? ${suffix}`, [name])
  return camelcaseKeys(rows)
}
export async function queryUserWithOption(conn: any, mail: string): Promise<UserRow[]> {
  const [rows] = await conn.query(`SELECT * FROM user where mail = ? `, [mail])
  //@ts-ignore
  return camelcaseKeys(rows)
}
export async function updateUser(user: Partial<UserRow>, id: number) {
  const pool = await getPool()

  return pool.query(`UPDATE user SET ? WHERE id = ?`, [user, id])
}
export async function queryOssInRss(userId: number) {
  const pool = await getPool()

  const [rows] = await pool.query(`SELECT * FROM rss LEFT JOIN oss ON rss.oss_id = oss.id WHERE  user_id = ?`, [userId])
  return camelcaseKeys(rows)
}
export async function queryPhotoRows(ossId: number) {
  const pool = await getPool()
  const [rows] = await pool.query('SELECT * FROM photo WHERE oss_id = ? ', [ossId])
  return camelcaseKeys(rows)
}

