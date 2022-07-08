import { pbMap } from './types';
import {
	l, find, findIndex, setNth, prepand, filter, map, join, List, isEmpty, isFilledList
} from '../list';
import { pair, fir, sec, Pair } from '../pair';

export function mkMap<K, V>(entries?: [K, V][]): pbMap<K, V> {
	if(entries === undefined) {
		return <pbMap<K, V>>l();
	}

	return l(
		...entries.map((item) => pair(item[0], item[1]))
	);
}

export function get<K, V>(mp: pbMap<K, V>, key: K): V | undefined {
	const elem = find(mp, (item) => fir(item) === key);

	return elem === undefined ? elem : sec(elem);
}

export function set<K, V>(mp: pbMap<K, V>, key: K, value: V): pbMap<K, V> {
	const index = findIndex(mp, (item) => fir(item) === key);

	if(index < 0) {
		return prepand(mp, pair(key, value));
	}

	return setNth(mp, index, pair(key, value));
}

export function has<K, V>(mp: pbMap<K, V>, key: K): boolean {
	return find(mp, (item) => fir(item) === key) === undefined ? false : true;
}

export function remove<K, V>(mp: pbMap<K, V>, ...keys: K[]): pbMap<K, V> {
	return filter(
		mp,
		(item) => keys.indexOf(fir(item)) < 0
	);
}

export function keys<K, V>(mp: pbMap<K, V>): List<K> {
	return map(mp, (item) => fir(item));
}

export function values<K, V>(mp: pbMap<K, V>): List<V> {
	return map(mp, (item) => sec(item));
}

export function merge<K, V>(
	firMap: pbMap<K, V>, secMap: pbMap<K, V> | Pair<K, V>
): pbMap<K, V> {
	if(isEmpty(secMap)) {
		return firMap;
	}

	if(isFilledList(secMap)) {
		const filteredMap = filter(
			firMap,
			(firItem) => {
				const key = fir(firItem);
				return findIndex(secMap, (secItem) => key === fir(secItem)) < 0
			}
		);

		return join(filteredMap, secMap);
	}

	return set(firMap, fir(secMap), sec(secMap));
}
