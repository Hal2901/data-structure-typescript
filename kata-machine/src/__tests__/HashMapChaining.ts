import HashMap from "@code/HashMapChaining";

test("hash-map", function () {
    const hashMap = new HashMap();

    hashMap.set("testKey1", "testValue1");
    hashMap.set("testKey2", "testValue2");
    hashMap.set("testKey3", "testValue3");
    hashMap.set("Key1test", "testValue4");

    expect(hashMap.has("testKey1")).toEqual(true);
    expect(hashMap.get("testKey3")).toEqual("testValue3");

    hashMap.set("testKey2", "newValue2");

    expect(hashMap.get("testKey2")).toEqual("newValue2");

    expect(hashMap.has("testKey3")).toEqual(true);

    expect(hashMap.has("nonexistentKey")).toEqual(false);

    expect(hashMap.remove("testKey2")).toEqual(true);
    expect(hashMap.has("testKey2")).toEqual(false);

    expect(hashMap.remove("nonexistentKey")).toEqual(false);

    expect(hashMap.getLength()).toEqual(3);

    hashMap.set("testKey5", "testValue5");
    hashMap.set("testKey6", "testValue6");
    hashMap.set("testKey7", "testValue7");

    expect(hashMap.get("testKey6")).toEqual("testValue6");

    expect(hashMap.getLength()).toEqual(6);

    hashMap.clear();
    expect(hashMap.getLength()).toEqual(0);

    hashMap.set("key1", "value1");
    hashMap.set("key2", "value2");
    expect(hashMap.keys()).toEqual(["key1", "key2"]);

    expect(hashMap.values()).toEqual(["value1", "value2"]);

    expect(hashMap.entries()).toEqual([
        ["key1", "value1"],
        ["key2", "value2"],
    ]);
});
