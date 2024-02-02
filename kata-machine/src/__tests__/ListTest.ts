export function test_list(list: List<number>): void {
    list.append(5);
    console.log("list.append(5)", list);
    list.append(7);
    console.log("list.append(7)", list);
    list.append(9);
    console.log("list.append(9)", list);

    expect(list.get(2)).toEqual(9);
    console.log("list.get(2)", list.get(2));
    expect(list.removeAt(1)).toEqual(7);
    console.log("list.removeAt(1)", list);
    expect(list.length).toEqual(2);
    console.log("list.length", list.length);

    list.append(11);
    console.log("list.append(11)", list);
    expect(list.removeAt(1)).toEqual(9);
    console.log("list.removeAt(1)", list);
    expect(list.remove(9)).toEqual(undefined);
    console.log("list.remove(9)", list);
    expect(list.removeAt(0)).toEqual(5);
    console.log("list.removeAt(0)", list);
    expect(list.removeAt(0)).toEqual(11);
    console.log("list.removeAt(0)", list);
    expect(list.length).toEqual(0);
    console.log("list.length", list.length);

    list.prepend(5);
    list.prepend(7);
    list.prepend(9);

    expect(list.get(2)).toEqual(5);
    expect(list.get(0)).toEqual(9);
    expect(list.remove(9)).toEqual(9);
    expect(list.length).toEqual(2);
    expect(list.get(0)).toEqual(7);
}
