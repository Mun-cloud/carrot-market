import { Kind, Product, Record } from "@prisma/client";
import useSWR from "swr";
import Item from "@components/item";

interface ProductListProps {
  kind: Kind;
}

export interface ProductWithCount extends Product {
  _count: { record: number };
}

interface RecordWithProduct extends Record {
  product: ProductWithCount;
}

interface SalesResponse {
  ok: boolean;
  records: RecordWithProduct[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<SalesResponse>(`/api/users/me/records?kind=${kind}`);
  return data ? (
    <>
      {data?.records.map((record) => (
        <Item
          id={record.product.id}
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          //   comments={1}
          hearts={
            record?.product?._count?.record ? record.product._count.record : 0
          }
        />
      ))}
    </>
  ) : null;
}
