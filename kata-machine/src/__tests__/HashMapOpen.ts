import HashMap from "@code/HashMapOpen";

test("hash-map", function () {
    const hashMap = new HashMap();

    hashMap.set("testKey1");
    hashMap.set("testKey2");
    hashMap.set("testKey3");
    hashMap.set("testKey4");
    hashMap.set("testKey5");
    hashMap.set("testKey6");
    hashMap.set("testKey7");
    hashMap.set("testKey8");
    hashMap.set("testKey9");
    hashMap.set("testKey10");

    expect(hashMap.has("testKey5")).toEqual(true);
    expect(hashMap.get("testKey3")).toEqual([12, "testKey3"]);
    expect(hashMap.has("nonexistentKey")).toEqual(false);
    expect(hashMap.remove("testKey7")).toEqual(true);
    expect(hashMap.has("testKey7")).toEqual(false);
    expect(hashMap.remove("nonexistentKey")).toEqual(false);
    expect(hashMap.getLength()).toEqual(9);
    hashMap.set("testKey7");
    expect(hashMap.getLength()).toEqual(10);
    hashMap.clear();
    expect(hashMap.getLength()).toEqual(0);

    hashMap.set("key1");
    hashMap.set("key2");
    hashMap.set("key3");
    hashMap.set("key4");
    hashMap.set("key5");
    expect(hashMap.keys()).toEqual(["key4", "key5", "key1", "key2", "key3"]);
    expect(hashMap.entries()).toEqual([
        [0, "key4"],
        [1, "key5"],
        [10, "key1"],
        [11, "key2"],
        [12, "key3"],
    ]);
    hashMap.displayTable();
    hashMap.set("key6");
    hashMap.set("key7");
    hashMap.set("key8");
    hashMap.set("key9");
    hashMap.set("key10");
    hashMap.set("key11");
    hashMap.set("key12");
    hashMap.set("key13");
    hashMap.set("key14");
    hashMap.set("key15");
    hashMap.displayTable();
});
